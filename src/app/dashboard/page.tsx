'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import MobileAppDemo from '@/components/mobile-app-demo'
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Brain,
  Shield,
  Settings,
  Bell,
  Search,
  Menu,
  Home,
  PieChart,
  Target,
  FileText,
  Globe,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Activity,
  Vote,
  Megaphone,
  Eye,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Smartphone,
  Monitor,
  LogOut
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsMobile } from '@/hooks/use-mobile'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const isMobile = useIsMobile()
  const [userType, setUserType] = useState('campaign')
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('userType') : null
    if (stored) setUserType(stored)
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  // Auto-switch to mobile view on small screens
  useEffect(() => {
    if (isMobile && viewMode === 'desktop') {
      setViewMode('mobile')
    }
  }, [isMobile, viewMode])

  // Show mobile demo if in mobile mode
  if (viewMode === 'mobile') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* View Mode Toggle */}
        <div className="bg-white border-b p-2">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="text-xs"
              >
                <Smartphone className="h-3 w-3 mr-1" />
                Mobile
              </Button>
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="text-xs"
              >
                <Monitor className="h-3 w-3 mr-1" />
                Desktop
              </Button>
            </div>
          </div>
        </div>
        <MobileAppDemo />
      </div>
    )
  }

  const allNavigation = [
    { name: 'Dashboard', icon: Home, href: '/dashboard', roles: ['campaign','party','politician'] },
    { name: 'Party Management', icon: Users, href: '/dashboard/party-management', roles: ['party','campaign'], badge: 'New' },
    { name: 'Voter Analysis', icon: UserCheck, href: '/dashboard/voter-analysis', roles: ['campaign','party'] },
    { name: 'Politician Hub', icon: Star, href: '/dashboard/politician-hub', roles: ['politician'] },
    { name: 'Constituent Engagement', icon: MessageSquare, href: '/dashboard/constituent-engagement', roles: ['campaign','politician','party'] },
    { name: 'Policy Impact', icon: FileText, href: '/dashboard/policy-impact', roles: ['campaign','party'] },
    { name: 'Campaign Manager', icon: Megaphone, href: '/dashboard/campaign-manager', roles: ['campaign'], badge: 'AI' },
    { name: 'Events', icon: Calendar, href: '/dashboard/events', roles: ['politician','campaign','party'] },
    { name: 'AI Insights', icon: Brain, href: '/dashboard/ai-insights', roles: ['campaign','party','politician'] },
    { name: 'Media Monitor', icon: Eye, href: '/dashboard/media-monitor', roles: ['campaign','politician'] },
    { name: 'Compliance', icon: Shield, href: '/dashboard/compliance', roles: ['party'] },
    { name: 'Collaboration', icon: Target, href: '/dashboard/collaboration', roles: ['campaign','party','politician'] },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['campaign','party','politician'] },
  ]
  const navigation = allNavigation.filter(item => item.roles.includes(userType))

  const stats = [
    { name: 'Total Voters', value: '2.4M', change: '+12.3%', icon: Users, color: 'text-blue-600' },
    { name: 'Campaign Progress', value: '78%', change: '+5.2%', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Constituent Sentiment', value: '72%', change: '+8.1%', icon: MessageSquare, color: 'text-purple-600' },
    { name: 'Events This Month', value: '24', change: '+3', icon: Calendar, color: 'text-orange-600' },
  ]

  const recentActivities = [
    { id: 1, action: 'Voter segmentation analysis completed', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'New campaign proposal submitted', time: '4 hours ago', status: 'pending' },
    { id: 3, action: 'Sentiment analysis report generated', time: '6 hours ago', status: 'success' },
    { id: 4, action: 'Policy impact simulation running', time: '8 hours ago', status: 'warning' },
    { id: 5, action: 'Media monitoring alert triggered', time: '12 hours ago', status: 'info' },
  ]

  const quickActions = [
    { name: 'Generate Voter Report', icon: BarChart3, description: 'Create detailed voter analysis' },
    { name: 'Schedule Campaign Event', icon: Calendar, description: 'Plan and organize events' },
    { name: 'Analyze Sentiment', icon: Brain, description: 'AI-powered sentiment analysis' },
    { name: 'Compliance Check', icon: Shield, description: 'Verify regulatory compliance' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out' : 'relative w-64 bg-white shadow-sm'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Politix</span>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <XCircle className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isCurrent = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant={item.badge === 'AI' ? 'default' : 'secondary'} className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{session.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search voters, campaigns, policies..."
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* View Mode Toggle */}
            <div className="mb-4 flex justify-end">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="text-xs"
                >
                  <Monitor className="h-3 w-3 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="text-xs"
                >
                  <Smartphone className="h-3 w-3 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session.user?.name || 'User'}
              </h1>
              <p className="mt-2 text-gray-600">Here's what's happening with your political campaigns today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Common tasks and AI-powered tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quickActions.map((action) => (
                        <Button
                          key={action.name}
                          variant="outline"
                          className="h-auto p-4 flex items-start space-x-3 hover:bg-gray-50"
                        >
                          <div className="p-2 rounded-lg bg-blue-50">
                            <action.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{action.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>
                      Latest updates from your campaign operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                          {getStatusIcon(activity.status)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Performance */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Voter Reach</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Engagement Rate</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Fundraising Goal</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Volunteer Recruitment</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Voter Trend Detected</p>
                        <p className="text-xs text-blue-700 mt-1">18-24 age group showing 23% increase in engagement</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Optimization Opportunity</p>
                        <p className="text-xs text-green-700 mt-1">Campaign messaging resonates well in suburban areas</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">Sentiment Alert</p>
                        <p className="text-xs text-purple-700 mt-1">Positive sentiment trending upward on social media</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}