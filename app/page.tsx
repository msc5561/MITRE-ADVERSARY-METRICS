'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, HeatMapChart } from 'recharts'
import { Globe, TrendingUp, AlertTriangle, Target } from 'lucide-react'

interface AdversaryData {
  id: string
  name: string
  country: string
  latitude: number
  longitude: number
  threatLevel: number
  techniques: number
  lastSeen: string
  tactics: string[]
}

interface CountryHeatmap {
  country: string
  threatScore: number
  adversaryCount: number
  incidentCount: number
}

const adversaryData: AdversaryData[] = [
  { id: 'apt1', name: 'APT1', country: 'China', latitude: 39.9, longitude: 116.4, threatLevel: 95, techniques: 54, lastSeen: '2024-11-12', tactics: ['Reconnaissance', 'Execution', 'Persistence'] },
  { id: 'apt28', name: 'APT28', country: 'Russia', latitude: 55.7, longitude: 37.6, threatLevel: 92, techniques: 67, lastSeen: '2024-11-10', tactics: ['Initial Access', 'Execution', 'Exfiltration'] },
  { id: 'apt33', name: 'APT33', country: 'Iran', latitude: 35.7, longitude: 51.4, threatLevel: 88, techniques: 48, lastSeen: '2024-11-11', tactics: ['Execution', 'Persistence', 'Command & Control'] },
  { id: 'apt41', name: 'APT41', country: 'China', latitude: 31.2, longitude: 121.5, threatLevel: 85, techniques: 72, lastSeen: '2024-11-09', tactics: ['Execution', 'Privilege Escalation', 'Exfiltration'] },
  { id: 'wizard-spider', name: 'Wizard Spider', country: 'Russia', latitude: 48.2, longitude: 16.4, threatLevel: 90, techniques: 51, lastSeen: '2024-11-12', tactics: ['Initial Access', 'Lateral Movement', 'Exfiltration'] },
  { id: 'fin7', name: 'FIN7', country: 'Russia', latitude: 59.9, longitude: 30.3, threatLevel: 87, techniques: 58, lastSeen: '2024-11-08', tactics: ['Initial Access', 'Persistence', 'Defense Evasion'] },
  { id: 'lazarus', name: 'Lazarus Group', country: 'North Korea', latitude: 39.0, longitude: 125.7, threatLevel: 94, techniques: 63, lastSeen: '2024-11-12', tactics: ['Execution', 'Command & Control', 'Exfiltration'] },
  { id: 'turla', name: 'Turla', country: 'Russia', latitude: 55.7, longitude: 37.6, threatLevel: 89, techniques: 65, lastSeen: '2024-11-11', tactics: ['Reconnaissance', 'Execution', 'Persistence'] },
  { id: 'carbanak', name: 'Carbanak', country: 'Russia', latitude: 55.8, longitude: 37.5, threatLevel: 86, techniques: 44, lastSeen: '2024-11-07', tactics: ['Initial Access', 'Execution', 'Exfiltration'] },
  { id: 'sofacy', name: 'Sofacy', country: 'Russia', latitude: 55.75, longitude: 37.65, threatLevel: 88, techniques: 59, lastSeen: '2024-11-12', tactics: ['Initial Access', 'Execution', 'Lateral Movement'] },
]

const countryHeatmapData: CountryHeatmap[] = [
  { country: 'Russia', threatScore: 90, adversaryCount: 5, incidentCount: 1245 },
  { country: 'China', threatScore: 87, adversaryCount: 2, incidentCount: 892 },
  { country: 'Iran', threatScore: 82, adversaryCount: 1, incidentCount: 456 },
  { country: 'North Korea', threatScore: 94, adversaryCount: 1, incidentCount: 678 },
  { country: 'United States', threatScore: 45, adversaryCount: 3, incidentCount: 234 },
  { country: 'Israel', threatScore: 52, adversaryCount: 1, incidentCount: 189 },
  { country: 'UK', threatScore: 48, adversaryCount: 1, incidentCount: 156 },
  { country: 'India', threatScore: 41, adversaryCount: 2, incidentCount: 234 },
]

const monthlyData = [
  { month: 'Jul', incidents: 24, blocked: 18, detected: 42 },
  { month: 'Aug', incidents: 32, blocked: 22, detected: 58 },
  { month: 'Sep', incidents: 28, blocked: 20, detected: 51 },
  { month: 'Oct', incidents: 45, blocked: 31, detected: 78 },
  { month: 'Nov', incidents: 52, blocked: 38, detected: 94 },
]

const tacticsData = [
  { name: 'Execution', count: 8, color: 'oklch(0.5 0.2 13)' },
  { name: 'Persistence', count: 6, color: 'oklch(0.45 0.2 25)' },
  { name: 'Privilege Escalation', count: 5, color: 'oklch(0.6 0.15 60)' },
  { name: 'Initial Access', count: 6, color: 'oklch(0.55 0.2 20)' },
  { name: 'Exfiltration', count: 5, color: 'oklch(0.5 0.18 35)' },
  { name: 'Command & Control', count: 4, color: 'oklch(0.5 0.2 13)' },
]

export default function MitreAttackDashboard() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [threatFilter, setThreatFilter] = useState<number>(0)

  const filteredAdversaries = useMemo(() => {
    return adversaryData.filter(
      (a) => a.threatLevel >= threatFilter && (!selectedCountry || a.country === selectedCountry)
    )
  }, [selectedCountry, threatFilter])

  const topThreats = useMemo(() => {
    return [...adversaryData].sort((a, b) => b.threatLevel - a.threatLevel).slice(0, 5)
  }, [])

  const getThreatColor = (level: number): string => {
    if (level >= 90) return 'oklch(0.45 0.2 25)'
    if (level >= 80) return 'oklch(0.5 0.2 13)'
    if (level >= 70) return 'oklch(0.6 0.15 60)'
    return 'oklch(0.55 0.2 20)'
  }

  const getHeatmapIntensity = (threatScore: number): string => {
    const intensity = (threatScore / 100) * 0.8 + 0.2
    return `rgba(239, 68, 68, ${intensity})`
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">MITRE ATT&CK Threat Intelligence</h1>
          </div>
          <p className="text-muted-foreground">Global adversary tracking and threat assessment dashboard</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Adversaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{adversaryData.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Currently tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{adversaryData.filter((a) => a.threatLevel >= 90).length}</div>
              <p className="text-xs text-muted-foreground mt-2">Threat Level 90+</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Countries Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{new Set(adversaryData.map((a) => a.country)).size}</div>
              <p className="text-xs text-muted-foreground mt-2">Unique origins</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{adversaryData.reduce((sum, a) => sum + a.techniques, 0)}</div>
              <p className="text-xs text-muted-foreground mt-2">Observed techniques</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Threat Level: {threatFilter}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={threatFilter}
                onChange={(e) => setThreatFilter(parseInt(e.target.value))}
                className="w-48"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Country</label>
              <select
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
              >
                <option value="">All Countries</option>
                {[...new Set(adversaryData.map((a) => a.country))].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Global Heatmap */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Global Threat Heatmap</CardTitle>
              <CardDescription>Adversary distribution by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {countryHeatmapData.map((item) => (
                  <div key={item.country} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{item.country}</span>
                      <span className="text-xs text-muted-foreground">{item.threatScore}%</span>
                    </div>
                    <div className="h-6 bg-muted rounded overflow-hidden">
                      <div
                        className="h-full heatmap-cell"
                        style={{
                          width: `${item.threatScore}%`,
                          background: getThreatColor(item.threatScore),
                        }}
                      />
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{item.adversaryCount} adversaries</span>
                      <span>{item.incidentCount} incidents</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Threats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Top Threats</CardTitle>
              <CardDescription>Highest threat level adversaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topThreats.map((threat) => (
                  <div key={threat.id} className="p-3 bg-muted rounded-lg border border-border hover:border-accent transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{threat.name}</h4>
                        <p className="text-xs text-muted-foreground">{threat.country}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: getThreatColor(threat.threatLevel) }}>
                          {threat.threatLevel}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{threat.techniques} techniques</span>
                      <span>Last seen: {threat.lastSeen}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {threat.tactics.map((tactic) => (
                        <span key={tactic} className="text-xs px-2 py-1 bg-card rounded border border-border text-foreground">
                          {tactic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Incident Trends</CardTitle>
            <CardDescription>Monthly incident detection and blocking metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                <XAxis dataKey="month" stroke="oklch(0.6 0 0)" />
                <YAxis stroke="oklch(0.6 0 0)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.12 0 0)', 
                    border: '1px solid oklch(0.2 0 0)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'oklch(0.95 0 0)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="oklch(0.45 0.2 25)" strokeWidth={2} />
                <Line type="monotone" dataKey="detected" stroke="oklch(0.6 0.15 60)" strokeWidth={2} />
                <Line type="monotone" dataKey="blocked" stroke="oklch(0.55 0.2 20)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filtered Adversaries */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Adversary List</CardTitle>
            <CardDescription>Showing {filteredAdversaries.length} of {adversaryData.length} adversaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Country</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">Threat</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">Techniques</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdversaries.map((adversary) => (
                    <tr key={adversary.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">{adversary.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{adversary.country}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-2 py-1 rounded font-semibold text-sm text-foreground"
                          style={{ backgroundColor: getThreatColor(adversary.threatLevel) }}
                        >
                          {adversary.threatLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center text-muted-foreground">{adversary.techniques}</td>
                      <td className="py-3 px-3 text-muted-foreground text-xs">{adversary.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
