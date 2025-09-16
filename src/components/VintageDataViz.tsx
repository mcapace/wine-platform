"use client"

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface VintageData {
  year: string
  rating: number
  price: number
  production: number
  temperature: number
  rainfall: number
}

const vintageData: VintageData[] = [
  { year: '2015', rating: 92, price: 85, production: 1200000, temperature: 14.2, rainfall: 650 },
  { year: '2016', rating: 96, price: 95, production: 1100000, temperature: 13.8, rainfall: 580 },
  { year: '2017', rating: 90, price: 80, production: 1300000, temperature: 15.1, rainfall: 720 },
  { year: '2018', rating: 94, price: 90, production: 1150000, temperature: 14.5, rainfall: 620 },
  { year: '2019', rating: 97, price: 100, production: 1050000, temperature: 13.9, rainfall: 550 },
  { year: '2020', rating: 93, price: 88, production: 1250000, temperature: 14.8, rainfall: 680 },
  { year: '2021', rating: 95, price: 93, production: 1180000, temperature: 14.3, rainfall: 610 },
  { year: '2022', rating: 98, price: 110, production: 1000000, temperature: 13.7, rainfall: 520 },
]

const radarData = [
  { subject: 'Body', A: 120, B: 110, fullMark: 150 },
  { subject: 'Tannin', A: 98, B: 130, fullMark: 150 },
  { subject: 'Acidity', A: 86, B: 130, fullMark: 150 },
  { subject: 'Fruit', A: 99, B: 100, fullMark: 150 },
  { subject: 'Oak', A: 85, B: 90, fullMark: 150 },
  { subject: 'Finish', A: 65, B: 85, fullMark: 150 },
]

const COLORS = ['#8B0000', '#D4AF37', '#228B22', '#800080', '#FF6347', '#DC143C']

export default function VintageDataViz() {
  return (
    <div className="w-full space-y-8">
      {/* 2D Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <motion.div
          className="bg-gradient-to-br from-black/70 to-burgundy-900/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-playfair text-wine-gold mb-6">Vintage Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vintageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '8px' 
                }}
                labelStyle={{ color: '#D4AF37' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#D4AF37" 
                strokeWidth={3} 
                dot={{ r: 6 }} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#8B0000" 
                strokeWidth={3} 
                dot={{ r: 6 }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* Radar Chart */}
        <motion.div
          className="bg-gradient-to-br from-black/70 to-burgundy-900/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-playfair text-wine-gold mb-6">Wine Profile</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
              <PolarRadiusAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
              <Radar name="2022 Vintage" dataKey="A" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.3} />
              <Radar name="2021 Vintage" dataKey="B" stroke="#8B0000" fill="#8B0000" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* Bar Chart */}
        <motion.div
          className="bg-gradient-to-br from-black/70 to-burgundy-900/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-playfair text-wine-gold mb-6">Production Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vintageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '8px' 
                }}
                labelStyle={{ color: '#D4AF37' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Bar dataKey="production" fill="#D4AF37" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* Pie Chart */}
        <motion.div
          className="bg-gradient-to-br from-black/70 to-burgundy-900/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-playfair text-wine-gold mb-6">Quality Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Excellent (95+)', value: 25 },
                  { name: 'Very Good (90-94)', value: 50 },
                  { name: 'Good (85-89)', value: 20 },
                  { name: 'Average (<85)', value: 5 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[
                  { name: 'Excellent (95+)', value: 25 },
                  { name: 'Very Good (90-94)', value: 50 },
                  { name: 'Good (85-89)', value: 20 },
                  { name: 'Average (<85)', value: 5 }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '8px' 
                }}
                labelStyle={{ color: '#D4AF37' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      {/* 3D Visualization Placeholder */}
      <motion.div
        className="bg-gradient-to-br from-black/70 to-burgundy-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-3xl font-playfair text-wine-gold mb-6 text-center">3D Vintage Analysis</h3>
        <div className="relative h-96 bg-gradient-to-br from-burgundy-900/50 to-wine-gold/10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-wine-gold/20 to-burgundy-900/20 rounded-full flex items-center justify-center">
                <div className="text-4xl">🍷</div>
              </div>
              <h4 className="text-xl font-bold text-wine-gold mb-2">Interactive 3D Charts</h4>
              <p className="text-white/70">
                Advanced 3D visualizations showing vintage correlations,<br />
                climate impact analysis, and regional comparisons
              </p>
            </div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-wine-gold/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}