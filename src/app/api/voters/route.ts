import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state')
    minAge = searchParams.get('minAge')
    const maxAge = searchParams.get('maxAge')
    const politicalLeanings = searchParams.get('politicalLeanings')

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' }
    }

    if (politicalLeanings) {
      where.politicalLeanings = { contains: politicalLeanings, mode: 'insensitive' }
    }

    if (minAge || maxAge) {
      where.dateOfBirth = {}
      if (minAge) {
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear() - parseInt(minAge))
        where.dateOfBirth.lte = minDate
      }
      if (maxAge) {
        const maxDate = new Date()
        maxDate.setFullYear(maxDate.getFullYear() - parseInt(maxAge))
        where.dateOfBirth.gte = maxDate
      }
    }

    const [voters, total] = await Promise.all([
      db.voter.findMany({
        where,
        include: {
          constituent: {
            select: {
              id: true,
              relationshipType: true,
              priority: true,
              sentimentScore: true
            }
          },
          _count: {
            select: {
              interactions: true,
              eventAttendees: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.voter.count({ where })
    ])

    return NextResponse.json({
      voters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching voters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch voters' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      dateOfBirth, 
      address, 
      city, 
      state, 
      zipCode, 
      country,
      voterId,
      registrationDate,
      demographics,
      politicalLeanings,
      preferredContact,
      isRegistered
    } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    const voter = await db.voter.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        address,
        city,
        state,
        zipCode,
        country,
        voterId,
        registrationDate: registrationDate ? new Date(registrationDate) : null,
        demographics,
        politicalLeanings,
        preferredContact,
        isRegistered: isRegistered || false
      }
    })

    return NextResponse.json(voter, { status: 201 })
  } catch (error) {
    console.error('Error creating voter:', error)
    return NextResponse.json(
      { error: 'Failed to create voter' },
      { status: 500 }
    )
  }
}