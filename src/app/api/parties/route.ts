import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { abbreviation: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const [parties, total] = await Promise.all([
      db.party.findMany({
        where,
        include: {
          leader: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              politicians: true,
              members: true,
              campaigns: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.party.count({ where })
    ])

    return NextResponse.json({
      parties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching parties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch parties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, abbreviation, description, logo, color, foundedAt, leaderId } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Party name is required' },
        { status: 400 }
      )
    }

    const party = await db.party.create({
      data: {
        name,
        abbreviation,
        description,
        logo,
        color,
        foundedAt: foundedAt ? new Date(foundedAt) : null,
        leaderId
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(party, { status: 201 })
  } catch (error) {
    console.error('Error creating party:', error)
    return NextResponse.json(
      { error: 'Failed to create party' },
      { status: 500 }
    )
  }
}