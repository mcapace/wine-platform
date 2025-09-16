"use client"

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
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

// 3D Surface Plot Component
function SurfacePlot() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  
  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32)
    const positions = geometry.attributes.position
    
    // Create surface based on vintage data
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const dataIndex = Math.floor((x + 1) * (vintageData.length - 1) / 2)
      if (dataIndex >= 0 && dataIndex < vintageData.length) {
        const rating = vintageData[dataIndex].rating
        positions.setZ(i, (rating - 90) * 0.02)
      }
    }
    
    positions.needsUpdate = true
    geometry.computeVertexNormals()
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <meshStandardMaterial
        color="#8B0000"
        wireframe={true}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// 3D Bar Chart Component
function BarChart3D() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {vintageData.map((data, index) => {
        const height = (data.rating - 90) * 0.02
        const x = (index - vintageData.length / 2) * 0.3
        
        return (
          <group key={data.year} position={[x, height / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.2, height, 0.2]} />
              <meshStandardMaterial
                color={COLORS[index % COLORS.length]}
                emissive={COLORS[index % COLORS.length]}
                emissiveIntensity={0.2}
              />
            </mesh>
            <Text
              position={[0, height + 0.1, 0]}
              fontSize={0.1}
              color="#D4AF37"
              anchorX="center"
              anchorY="middle"
            >
              {data.year}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default function VintageDataViz() {
  const [activeChart, setActiveChart] = useState<'3d' | '2d'>('3d')
  const [chartType, setChartType] = useState<'surface' | 'bars'>('surface')

  return (
    <div className="w-full space-y-8">
      {/* 3D Visualization */}
      {activeChart === '3d' && (
        <div className="relative w-full h-[500px] bg-gradient-to-br from-black via-burgundy-950 to-black rounded-xl overflow-hidden">
          <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#D4AF37" />
            
            {chartType === 'surface' ? <SurfacePlot /> : <BarChart3D />}
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={5}
            />
          </Canvas>
          
          {/* 3D Controls */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <h3 className="text-white font-bold mb-3">3D Visualization</h3>
            <div className="space-y-2">
              <motion.button
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  chartType === 'surface' ? 'bg-wine-gold text-black' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setChartType('surface')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Surface Plot
              </motion.button>
              <motion.button
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  chartType === 'bars' ? 'bg-wine-gold text-black' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setChartType('bars')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                3D Bars
              </motion.button>
            </div>
          </div>
        </div>
      )}
      
      {/* 2D Charts */}
      {activeChart === '2d' && (
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
      )}
      
      {/* Chart Type Toggle */}
      <div className="flex justify-center gap-4">
        <motion.button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeChart === '3d' 
              ? 'bg-wine-gold text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          onClick={() => setActiveChart('3d')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          3D Visualizations
        </motion.button>
        <motion.button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeChart === '2d' 
              ? 'bg-wine-gold text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          onClick={() => setActiveChart('2d')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          2D Charts
        </motion.button>
      </div>
    </div>
  )
}
