import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partyId = params.id

    // Get party membership trends
    const membershipTrends = await db.partyMember.groupBy({
      by: ['joinedAt'],
      where: {
        partyId,
        joinedAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        joinedAt: 'asc'
      }
    })

    // Get membership by type
    const membershipByType = await db.partyMember.groupBy({
      by: ['membershipType'],
      where: { partyId },
      _count: {
        id: true
      }
    })

    // Get engagement metrics
    const engagementMetrics = await db.partyMember.aggregate({
      where: { partyId },
      _avg: {
        engagementScore: true
      },
      _sum: {
        volunteerHours: true
      },
      _count: {
        id: true
      }
    })

    // Get recent activities
    const recentActivities = await db.partyMember.findMany({
      where: { partyId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { joinedAt: 'desc' },
      take: 10
    })

    // Get politician performance
    const politicianPerformance = await db.politician.findMany({
      where: { partyId },
      include: {
        _count: {
          select: {
            campaigns: true,
            events: true
          }
        }
      }
    })

    // Calculate growth rate
    const currentMembers = await db.partyMember.count({
      where: { partyId }
    })

    const lastMonthMembers = await db.partyMember.count({
      where: {
        partyId,
        joinedAt: {
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      }
    })

    const growthRate = currentMembers > 0 ? 
      ((currentMembers - lastMonthMembers) / lastMonthMembers) * 100 : 0

    const analytics = {
      overview: {
        totalMembers: currentMembers,
        growthRate: Math.round(growthRate * 100) / 100,
        avgEngagementScore: Math.round((engagementMetrics._avg.engagementScore || 0) * 100) / 100,
        totalVolunteerHours: engagementMetrics._sum.volunteerHours || 0
      },
      membershipTrends: membershipTrends.map(trend => ({
        date: trend.joinedAt,
        count: trend._count.id
      })),
      membershipByType: membershipByType.map(type => ({
        type: type.membershipType,
        count: type._count.id
      })),
      recentActivities: recentActivities.map(activity => ({
        id: activity.id,
        user: activity.user,
        membershipType: activity.membershipType,
        joinedAt: activity.joinedAt,
        engagementScore: activity.engagementScore
      })),
      politicianPerformance: politicianPerformance.map(politician => ({
        id: politician.id,
        name: `${politician.firstName} ${politician.lastName}`,
        position: politician.position,
        approvalRating: politician.approvalRating,
        campaignsCount: politician._count.campaigns,
        eventsCount: politician._count.events
      }))
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching party analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch party analytics' },
      { status: 500 }
    )
  }
}