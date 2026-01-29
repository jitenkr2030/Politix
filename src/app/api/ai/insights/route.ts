import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const InsightRequestSchema = z.object({
  type: z.enum(['voter_trend', 'campaign_optimization', 'sentiment_analysis', 'prediction']),
  timeframe: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
  filters: z.object({
    partyId: z.string().optional(),
    campaignId: z.string().optional(),
    politicianId: z.string().optional(),
    state: z.string().optional(),
  }).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, timeframe, filters } = InsightRequestSchema.parse(body)

    let insights = []

    switch (type) {
      case 'voter_trend':
        insights = await getVoterTrendInsights(timeframe, filters)
        break
      case 'campaign_optimization':
        insights = await getCampaignOptimizationInsights(timeframe, filters)
        break
      case 'sentiment_analysis':
        insights = await getSentimentAnalysisInsights(timeframe, filters)
        break
      case 'prediction':
        insights = await getPredictionInsights(timeframe, filters)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid insight type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      type,
      timeframe,
      insights,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error generating AI insights:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}

async function getVoterTrendInsights(timeframe: string, filters: any) {
  const dateFilter = getDateFilter(timeframe)
  
  // Get voter registration trends
  const registrationTrends = await db.voter.groupBy({
    by: ['registrationDate'],
    where: {
      registrationDate: dateFilter,
      ...(filters?.state && { state: filters.state })
    },
    _count: { id: true },
    orderBy: { registrationDate: 'asc' }
  })

  // Get engagement trends
  const engagementTrends = await db.voter.aggregate({
    where: {
      createdAt: dateFilter,
      ...(filters?.state && { state: filters.state })
    },
    _avg: { engagementLevel: true },
    _count: { id: true }
  })

  // Get demographic shifts
  const voters = await db.voter.findMany({
    where: {
      createdAt: dateFilter,
      demographics: { not: null },
      ...(filters?.state && { state: filters.state })
    },
    select: { demographics: true }
  })

  // Analyze demographic data
  const demographicInsights = analyzeDemographics(voters)

  return [
    {
      category: 'Registration Trends',
      type: 'trend',
      title: 'Voter Registration Momentum',
      description: `Voter registration has increased by ${calculateGrowthRate(registrationTrends)}% in the last ${timeframe}`,
      data: registrationTrends,
      confidence: 0.85,
      recommendations: [
        'Focus registration drives in areas with low registration rates',
        'Target demographic groups showing declining registration'
      ]
    },
    {
      category: 'Engagement Analysis',
      type: 'metric',
      title: 'Engagement Level Analysis',
      description: `Average voter engagement is ${Math.round((engagementTrends._avg.engagementLevel || 0) * 100)}%`,
      value: engagementTrends._avg.engagementLevel || 0,
      confidence: 0.92,
      recommendations: [
        'Increase personalized communication to boost engagement',
        'Identify and re-engage disengaged voter segments'
      ]
    },
    ...demographicInsights
  ]
}

async function getCampaignOptimizationInsights(timeframe: string, filters: any) {
  const dateFilter = getDateFilter(timeframe)
  
  const campaigns = await db.campaign.findMany({
    where: {
      startDate: dateFilter,
      ...(filters?.partyId && { partyId: filters.partyId }),
      ...(filters?.campaignId && { id: filters.campaignId })
    },
    include: {
      metrics: true,
      _count: {
        select: {
          events: true,
          staff: true
        }
      }
    }
  })

  // Analyze campaign performance
  const performanceInsights = campaigns.map(campaign => ({
    campaignId: campaign.id,
    campaignName: campaign.name,
    efficiency: calculateCampaignEfficiency(campaign),
    roi: calculateCampaignROI(campaign),
    recommendations: generateCampaignRecommendations(campaign)
  }))

  return [
    {
      category: 'Campaign Performance',
      type: 'optimization',
      title: 'Campaign Efficiency Analysis',
      description: 'AI-identified opportunities for campaign optimization',
      data: performanceInsights,
      confidence: 0.78,
      recommendations: [
        'Reallocate budget to high-performing channels',
        'Optimize event scheduling based on voter availability'
      ]
    }
  ]
}

async function getSentimentAnalysisInsights(timeframe: string, filters: any) {
  const dateFilter = getDateFilter(timeframe)
  
  // Get interactions with sentiment data
  const interactions = await db.interaction.findMany({
    where: {
      createdAt: dateFilter,
      sentiment: { not: null },
      ...(filters?.politicianId && { 
        constituent: { politicianId: filters.politicianId } 
      })
    },
    include: {
      constituent: {
        select: { politicianId: true }
      }
    }
  })

  // Calculate sentiment trends
  const sentimentTrends = calculateSentimentTrends(interactions)
  
  // Get media sentiment
  const mediaAppearances = await db.mediaAppearance.findMany({
    where: {
      publishDate: dateFilter,
      sentiment: { not: null },
      ...(filters?.politicianId && { politicianId: filters.politicianId })
    }
  })

  const mediaSentiment = calculateMediaSentiment(mediaAppearances)

  return [
    {
      category: 'Constituent Sentiment',
      type: 'sentiment',
      title: 'Constituent Sentiment Trends',
      description: `Overall sentiment is ${sentimentTrends.overall > 0 ? 'positive' : sentimentTrends.overall < 0 ? 'negative' : 'neutral'} at ${Math.round(sentimentTrends.overall * 100)}%`,
      value: sentimentTrends.overall,
      data: sentimentTrends.breakdown,
      confidence: 0.88,
      recommendations: generateSentimentRecommendations(sentimentTrends)
    },
    {
      category: 'Media Sentiment',
      type: 'sentiment',
      title: 'Media Coverage Analysis',
      description: `Media sentiment is ${mediaSentiment.overall > 0 ? 'positive' : mediaSentiment.overall < 0 ? 'negative' : 'neutral'}`,
      value: mediaSentiment.overall,
      confidence: 0.82,
      recommendations: [
        'Engage with media outlets showing positive sentiment',
        'Address negative coverage with proactive communication'
      ]
    }
  ]
}

async function getPredictionInsights(timeframe: string, filters: any) {
  // Simulate AI predictions (in a real app, this would use ML models)
  const predictions = [
    {
      category: 'Election Forecast',
      type: 'prediction',
      title: 'Election Outcome Prediction',
      description: 'Based on current trends and historical data',
      prediction: {
        winProbability: 0.67,
        confidenceInterval: [0.58, 0.76],
        keyFactors: ['Voter turnout', 'Campaign effectiveness', 'Economic indicators']
      },
      confidence: 0.73,
      recommendations: [
        'Focus on swing voter segments',
        'Increase get-out-the-vote efforts',
        'Address key voter concerns in campaign messaging'
      ]
    },
    {
      category: 'Voter Turnout',
      type: 'prediction',
      title: 'Expected Voter Turnout',
      description: 'Predicted voter participation rates',
      prediction: {
        expectedTurnout: 0.68,
        confidenceInterval: [0.62, 0.74],
        demographics: {
          '18-24': 0.45,
          '25-44': 0.62,
          '45-64': 0.75,
          '65+': 0.82
        }
      },
      confidence: 0.79,
      recommendations: [
        'Target youth voters with mobilization campaigns',
        'Maintain strong engagement with older demographics'
      ]
    }
  ]

  return predictions
}

// Helper functions
function getDateFilter(timeframe: string) {
  const now = new Date()
  let startDate = new Date()
  
  switch (timeframe) {
    case '7d':
      startDate.setDate(now.getDate() - 7)
      break
    case '30d':
      startDate.setDate(now.getDate() - 30)
      break
    case '90d':
      startDate.setDate(now.getDate() - 90)
      break
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1)
      break
  }
  
  return { gte: startDate }
}

function calculateGrowthRate(trends: any[]): number {
  if (trends.length < 2) return 0
  const first = trends[0]._count.id
  const last = trends[trends.length - 1]._count.id
  return first > 0 ? ((last - first) / first) * 100 : 0
}

function analyzeDemographics(voters: any[]): any[] {
  // Simplified demographic analysis
  return [
    {
      category: 'Demographic Shifts',
      type: 'demographic',
      title: 'Age Distribution Changes',
      description: 'Notable shifts in voter age demographics',
      confidence: 0.75,
      recommendations: [
        'Adjust messaging for growing demographic segments',
        'Monitor generational voting pattern changes'
      ]
    }
  ]
}

function calculateCampaignEfficiency(campaign: any): number {
  // Simplified efficiency calculation
  const budget = campaign.budget || 1
  const progress = campaign.progress || 0
  return (progress / budget) * 100
}

function calculateCampaignROI(campaign: any): number {
  // Simplified ROI calculation
  return Math.random() * 200 - 50 // Mock ROI between -50% and 150%
}

function generateCampaignRecommendations(campaign: any): string[] {
  const recommendations = []
  if (campaign.progress < 50) {
    recommendations.push('Accelerate campaign activities to meet timeline')
  }
  if (campaign.budget && campaign.progress > 80) {
    recommendations.push('Monitor budget utilization closely')
  }
  return recommendations
}

function calculateSentimentTrends(interactions: any[]): any {
  const sentiments = interactions.map(i => i.sentiment || 0)
  const overall = sentiments.reduce((a, b) => a + b, 0) / sentiments.length
  
  return {
    overall,
    breakdown: {
      positive: sentiments.filter(s => s > 0.2).length,
      neutral: sentiments.filter(s => s >= -0.2 && s <= 0.2).length,
      negative: sentiments.filter(s => s < -0.2).length
    }
  }
}

function calculateMediaSentiment(appearances: any[]): any {
  const sentiments = appearances.map(a => a.sentiment || 0)
  const overall = sentiments.reduce((a, b) => a + b, 0) / sentiments.length
  
  return { overall }
}

function generateSentimentRecommendations(trends: any): string[] {
  const recommendations = []
  if (trends.overall < -0.1) {
    recommendations.push('Address negative sentiment with proactive outreach')
  } else if (trends.overall > 0.1) {
    recommendations.push('Leverage positive sentiment in campaign messaging')
  }
  return recommendations
}