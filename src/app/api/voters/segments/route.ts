import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const segments = await db.voterSegment.findMany({
      include: {
        _count: {
          select: {
            voters: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(segments)
  } catch (error) {
    console.error('Error fetching voter segments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch voter segments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, criteria, priority } = body

    if (!name || !criteria) {
      return NextResponse.json(
        { error: 'Segment name and criteria are required' },
        { status: 400 }
      )
    }

    // Create the segment
    const segment = await db.voterSegment.create({
      data: {
        name,
        description,
        criteria,
        priority: priority || 'MEDIUM'
      }
    })

    // Apply criteria to get voter count
    const whereClause = buildWhereClause(criteria)
    const voterCount = await db.voter.count({ where: whereClause })

    // Calculate average engagement for this segment
    const avgEngagement = await db.voter.aggregate({
      where: whereClause,
      _avg: {
        engagementLevel: true
      }
    })

    // Update the segment with calculated metrics
    const updatedSegment = await db.voterSegment.update({
      where: { id: segment.id },
      data: {
        voterCount,
        avgEngagement: avgEngagement._avg.engagementLevel || 0
      }
    })

    return NextResponse.json(updatedSegment, { status: 201 })
  } catch (error) {
    console.error('Error creating voter segment:', error)
    return NextResponse.json(
      { error: 'Failed to create voter segment' },
      { status: 500 }
    )
  }
}

function buildWhereClause(criteria: any): any {
  const where: any = {}

  if (criteria.ageRange) {
    where.dateOfBirth = {}
    if (criteria.ageRange.min) {
      const minDate = new Date()
      minDate.setFullYear(minDate.getFullYear() - criteria.ageRange.min)
      where.dateOfBirth.lte = minDate
    }
    if (criteria.ageRange.max) {
      const maxDate = new Date()
      maxDate.setFullYear(maxDate.getFullYear() - criteria.ageRange.max)
      where.dateOfBirth.gte = maxDate
    }
  }

  if (criteria.location) {
    if (criteria.location.state) {
      where.state = { contains: criteria.location.state, mode: 'insensitive' }
    }
    if (criteria.location.city) {
      where.city = { contains: criteria.location.city, mode: 'insensitive' }
    }
  }

  if (criteria.politicalLeanings) {
    where.politicalLeanings = { 
      contains: criteria.politicalLeanings, 
      mode: 'insensitive' 
    }
  }

  if (criteria.engagementRange) {
    where.engagementLevel = {}
    if (criteria.engagementRange.min !== undefined) {
      where.engagementLevel.gte = criteria.engagementRange.min
    }
    if (criteria.engagementRange.max !== undefined) {
      where.engagementLevel.lte = criteria.engagementRange.max
    }
  }

  if (criteria.isRegistered !== undefined) {
    where.isRegistered = criteria.isRegistered
  }

  if (criteria.demographics) {
    if (criteria.demographics.education) {
      where.demographics = {
        path: ['education'],
        string_contains: criteria.demographics.education
      }
    }
    if (criteria.demographics.income) {
      where.demographics = {
        path: ['income'],
        string_contains: criteria.demographics.income
      }
    }
  }

  return where
}