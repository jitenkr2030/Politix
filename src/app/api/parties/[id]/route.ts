import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const party = await db.party.findUnique({
      where: { id: params.id },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        politicians: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          take: 10,
          orderBy: { joinedAt: 'desc' }
        },
        campaigns: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            politicians: true,
            members: true,
            campaigns: true,
            events: true
          }
        }
      }
    })

    if (!party) {
      return NextResponse.json(
        { error: 'Party not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(party)
  } catch (error) {
    console.error('Error fetching party:', error)
    return NextResponse.json(
      { error: 'Failed to fetch party' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, abbreviation, description, logo, color, foundedAt, leaderId, isActive } = body

    const party = await db.party.update({
      where: { id: params.id },
      data: {
        name,
        abbreviation,
        description,
        logo,
        color,
        foundedAt: foundedAt ? new Date(foundedAt) : null,
        leaderId,
        isActive
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

    return NextResponse.json(party)
  } catch (error) {
    console.error('Error updating party:', error)
    return NextResponse.json(
      { error: 'Failed to update party' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.party.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Party deleted successfully' })
  } catch (error) {
    console.error('Error deleting party:', error)
    return NextResponse.json(
      { error: 'Failed to delete party' },
      { status: 500 }
    )
  }
}