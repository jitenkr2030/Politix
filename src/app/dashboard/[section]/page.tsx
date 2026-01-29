import Link from 'next/link'

export default function DashboardSectionPage({ params }: { params: { section: string } }) {
  const sections: Record<string, string> = {
    'party-management': 'Party Management',
    'voter-analysis': 'Voter Analysis',
    'politician-hub': 'Politician Hub',
    'constituent-engagement': 'Constituent Engagement',
    'policy-impact': 'Policy Impact',
    'campaign-manager': 'Campaign Manager',
    'events': 'Events',
    'ai-insights': 'AI Insights',
    'media-monitor': 'Media Monitor',
    'compliance': 'Compliance',
    'collaboration': 'Collaboration',
    'settings': 'Settings'
  }

  const toTitleCase = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const title = sections[params.section] || toTitleCase(params.section)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          This section is under construction. Navigation is working and role-based. Use the sidebar to explore other modules.
        </p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
      </div>
    </div>
  )
}