'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Vote, 
  Users, 
  TrendingUp, 
  Brain, 
  Shield, 
  MessageSquare, 
  Calendar,
  BarChart3,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Lock,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: 'Party Management',
      description: 'Comprehensive party management with membership analysis and predictive modeling.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Voter Behavior Analysis',
      description: 'Deep insights into voter behavior with advanced segmentation and behavioral analytics.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      title: 'Politician Management',
      description: 'AI-driven scheduling and personalized communication tools for politicians.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: MessageSquare,
      title: 'Constituent Engagement',
      description: '24/7 AI-powered support with sentiment analysis and personalized communication.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Brain,
      title: 'Policy Impact Analysis',
      description: 'Advanced simulation tools to analyze policy impact and integrate feedback.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Target,
      title: 'Campaign Management',
      description: 'AI-driven campaign optimization with predictive analytics and social media management.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]

  const stats = [
    { value: '2.4M+', label: 'Voters Analyzed' },
    { value: '98%', label: 'Accuracy Rate' },
    { value: '500+', label: 'Campaigns Managed' },
    { value: '50+', label: 'Countries Served' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Campaign Manager',
      content: 'Politix transformed our campaign strategy. The AI insights helped us reach voters more effectively.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Party Leader',
      content: 'The comprehensive analytics and voter segmentation tools are game-changers for political organizing.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Political Analyst',
      content: 'The predictive modeling capabilities are incredibly accurate. Essential for modern political campaigns.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Vote className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Politix</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <Button onClick={() => router.push('/auth/signin')}>Sign In</Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</a>
              <a href="#solutions" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About</a>
              <Button className="w-full mt-2" onClick={() => router.push('/auth/signin')}>Sign In</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Political Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionize Political
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Campaign Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive political management platform with AI-driven insights, voter analysis, 
              and campaign optimization tools. Transform your political strategy with data-powered decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/auth/signup')} className="text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Political Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage successful political campaigns and engage with constituents effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Every Political Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for political parties, individual politicians, and campaign managers.
            </p>
          </div>

          <Tabs defaultValue="parties" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="parties">Political Parties</TabsTrigger>
              <TabsTrigger value="politicians">Politicians</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parties" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Party Management Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Membership Analysis</h4>
                        <p className="text-gray-600">Identify trends, preferences, and behavior patterns among party members.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Predictive Modeling</h4>
                        <p className="text-gray-600">Forecast election outcomes and optimize campaign resource allocation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Automated Task Management</h4>
                        <p className="text-gray-600">Streamline party operations with AI-powered automation.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="politicians" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Politician Management Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">AI-Driven Scheduling</h4>
                        <p className="text-gray-600">Optimize politician schedules automatically for maximum impact.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Personalized Communication</h4>
                        <p className="text-gray-600">Deliver targeted content to constituents based on preferences.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Constituent CRM</h4>
                        <p className="text-gray-600">Track interactions and provide personalized support.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="campaigns" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Campaign Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">AI-Driven Optimization</h4>
                        <p className="text-gray-600">Identify key voter segments and allocate resources effectively.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Predictive Analytics</h4>
                        <p className="text-gray-600">Predict election outcomes and inform campaign decisions.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Social Media Management</h4>
                        <p className="text-gray-600">AI-powered social media campaign optimization.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Political Leaders Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users have to say about transforming their political campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Political Campaign?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of political professionals using AI to win elections and serve constituents better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => router.push('/auth/signup')} className="text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Vote className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">Politix</span>
              </div>
              <p className="text-gray-400">
                AI-powered political management platform for modern campaigns.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
                <li><a href="#" className="hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Politix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}