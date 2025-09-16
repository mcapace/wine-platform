"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wine, ArrowLeft, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'
import VintageDataViz from '@/components/VintageDataViz'

// Sample vintage data
const vintageData = [
  { year: '2015', rating: 92, price: 85, production: 1200000 },
  { year: '2016', rating: 96, price: 95, production: 1100000 },
  { year: '2017', rating: 88, price: 75, production: 1300000 },
  { year: '2018', rating: 94, price: 90, production: 1150000 },
  { year: '2019', rating: 91, price: 88, production: 1250000 },
  { year: '2020', rating: 97, price: 105, production: 1050000 },
  { year: '2021', rating: 93, price: 92, production: 1180000 },
  { year: '2022', rating: 95, price: 98, production: 1120000 }
]

const regionData = [
  { name: 'Bordeaux', value: 35, color: '#8B0000' },
  { name: 'Napa Valley', value: 25, color: '#722F37' },
  { name: 'Tuscany', value: 20, color: '#DC143C' },
  { name: 'Burgundy', value: 15, color: '#4A1C1F' },
  { name: 'Others', value: 5, color: '#A0522D' }
]

export default function ChartsPage() {
  const [selectedChart, setSelectedChart] = useState('line')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-wine-gold transition">
            <ArrowLeft className="w-5 h-5" />
            <Wine className="w-6 h-6" />
            <span className="font-bold text-xl">Wine Platform</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-white/80 hover:text-white transition">Home</Link>
            <Link href="/regions" className="text-white/80 hover:text-white transition">Regions</Link>
            <Link href="/charts" className="text-wine-gold font-semibold">Charts</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-serif text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Vintage Charts
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Analyze vintage quality trends, pricing data, and regional performance
          </motion.p>
        </div>
      </section>

      {/* Chart Selector */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            {[
              { id: 'line', label: 'Vintage Trends', icon: TrendingUp },
              { id: 'bar', label: 'Production Data', icon: BarChart3 },
              { id: 'pie', label: 'Regional Share', icon: PieChart }
            ].map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedChart(chart.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  selectedChart === chart.id
                    ? 'bg-wine-gold text-black'
                    : 'glass text-white hover:bg-white/10'
                }`}
              >
                <chart.icon className="w-5 h-5" />
                {chart.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <motion.div
              className="lg:col-span-2 glass rounded-2xl p-8"
              key={selectedChart}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-wine-gold" />
                {selectedChart === 'line' && 'Vintage Quality Trends (2015-2022)'}
                {selectedChart === 'bar' && 'Production Volume by Year'}
                {selectedChart === 'pie' && 'Market Share by Region'}
              </h3>
              
              <div className="h-80">
                {selectedChart === 'line' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vintageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="#D4AF37" 
                        strokeWidth={3}
                        dot={{ fill: '#D4AF37', strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#8B0000" 
                        strokeWidth={3}
                        dot={{ fill: '#8B0000', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                
                {selectedChart === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vintageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="production" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {selectedChart === 'pie' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                        labelLine={false}
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">Key Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Best Vintage</span>
                    <span className="text-wine-gold font-bold">2020 (97 pts)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Avg Rating</span>
                    <span className="text-white font-semibold">93.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Price Range</span>
                    <span className="text-white font-semibold">$75-105</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Total Production</span>
                    <span className="text-white font-semibold">9.2M cases</span>
                  </div>
                </div>
              </motion.div>

              {/* Recent Trends */}
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">Recent Trends</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/80 text-sm">Quality trending upward</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-white/80 text-sm">Prices stabilizing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-white/80 text-sm">Production consistent</span>
                  </div>
                </div>
              </motion.div>

              {/* Investment Grade */}
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">Investment Grade</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-wine-gold mb-2">A+</div>
                  <p className="text-white/70 text-sm">
                    Excellent aging potential and market appreciation expected
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advanced Data Visualizations */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-playfair text-center mb-12 text-wine-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Advanced Analytics
          </motion.h2>
          <VintageDataViz />
        </div>
      </section>
    </div>
  )
}
