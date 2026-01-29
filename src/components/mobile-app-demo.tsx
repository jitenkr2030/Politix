'use client'

import { useState } from 'react'
import { 
  Smartphone, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  BarChart3,
  Bell,
  Search,
  Menu,
  Home,
  Vote,
  Star,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MobileAppDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const mobileStats = [
    { name: 'Voter Reach', value: '2.4M', change: '+12.3%', icon: Users, color: 'text-blue-600' },
    { name: 'Campaign Progress', value: '78%', change: '+5.2%', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Sentiment', value: '72%', change: '+8.1%', icon: MessageSquare, color: 'text-purple-600' },
    { name: 'Events', value: '24', change: '+3', icon: Calendar, color: 'text-orange-600' },
  ]

  const recentActivities = [
    { id: 1, action: 'Voter segmentation completed', time: '2h ago', status: 'success' },
    { id: 2, action: 'Campaign proposal submitted', time: '4h ago', status: 'pending' },
    { id: 3, action: 'Sentiment report generated', time: '6h ago', status: 'success' },
    { id: 4, action: 'Policy simulation running', time: '8h ago', status: 'warning' },
  ]

  const quickActions = [
    { name: 'Voter Analysis', icon: BarChart3, color: 'bg-blue-500' },
    { name: 'Schedule Event', icon: Calendar, color: 'bg-green-500' },
    { name: 'Sentiment Check', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Compliance', icon: CheckCircle, color: 'bg-orange-500' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default: return <AlertCircle className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Politix</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="text-xs">
              <Home className="h-4 w-4 mr-1" />
              Home
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <BarChart3 className="h-4 w-4 mr-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="voters" className="text-xs">
              <Users className="h-4 w-4 mr-1" />
              Voters
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
              <h2 className="text-lg font-bold mb-1">Welcome back, John</h2>
              <p className="text-sm opacity-90">Your campaign is performing well today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mobileStats.map((stat) => (
                <Card key={stat.name} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.name}</p>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.name}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center space-y-2"
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-medium">{action.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Campaign Performance</CardTitle>
                <CardDescription className="text-xs">Real-time analytics and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Voter Reach</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Engagement Rate</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Fundraising Goal</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Volunteer Recruitment</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-blue-900">Voter Trend Detected</p>
                  <p className="text-xs text-blue-700 mt-1">18-24 age group showing 23% increase</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs font-medium text-green-900">Optimization Opportunity</p>
                  <p className="text-xs text-green-700 mt-1">Messaging resonates in suburban areas</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs font-medium text-purple-900">Sentiment Alert</p>
                  <p className="text-xs text-purple-700 mt-1">Positive sentiment trending upward</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Voter Segments</CardTitle>
                <CardDescription className="text-xs">Key voter demographics and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Young Voters (18-24)</p>
                    <p className="text-xs text-gray-500">High engagement, swing voters</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">245K</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Suburban Families</p>
                    <p className="text-xs text-gray-500">Key demographic, policy-focused</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">892K</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Senior Citizens</p>
                    <p className="text-xs text-gray-500">High turnout, reliable</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">567K</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Phone calls made today</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Doors knocked</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Emails sent</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Social media engagements</span>
                    <span className="font-medium">3,456</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upcoming Events</CardTitle>
                <CardDescription className="text-xs">Campaign events and appearances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Town Hall Meeting</p>
                      <p className="text-xs text-gray-500 mt-1">Downtown Community Center</p>
                      <p className="text-xs text-gray-500">Tomorrow, 6:00 PM</p>
                    </div>
                    <Badge variant="outline" className="text-xs">245 RSVP</Badge>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Fundraising Dinner</p>
                      <p className="text-xs text-gray-500 mt-1">Grand Hotel Ballroom</p>
                      <p className="text-xs text-gray-500">Friday, 7:30 PM</p>
                    </div>
                    <Badge variant="outline" className="text-xs">89 RSVP</Badge>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Volunteer Training</p>
                      <p className="text-xs text-gray-500 mt-1">Campaign Headquarters</p>
                      <p className="text-xs text-gray-500">Saturday, 10:00 AM</p>
                    </div>
                    <Badge variant="outline" className="text-xs">34 RSVP</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Event Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Events this month</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Total attendees</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Avg. attendance rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Funds raised</span>
                    <span className="font-medium">$45,230</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2"
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="h-4 w-4" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2"
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2"
            onClick={() => setActiveTab('voters')}
          >
            <Users className="h-4 w-4" />
            <span className="text-xs">Voters</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2"
            onClick={() => setActiveTab('events')}
          >
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Events</span>
          </Button>
        </div>
      </div>
    </div>
  )
}