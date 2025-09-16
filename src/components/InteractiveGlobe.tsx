"use client"

import { motion } from 'framer-motion'
import { Globe, MapPin, Star } from 'lucide-react'

interface WineRegion {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  rating: number
  color: string
}

const wineRegions: WineRegion[] = [
  { id: 'bordeaux', name: 'Bordeaux', country: 'France', lat: 44.8378, lng: -0.5792, rating: 95, color: '#8B0000' },
  { id: 'napa', name: 'Napa Valley', country: 'USA', lat: 38.5025, lng: -122.2654, rating: 94, color: '#D4AF37' },
  { id: 'tuscany', name: 'Tuscany', country: 'Italy', lat: 43.7711, lng: 11.2486, rating: 93, color: '#228B22' },
  { id: 'burgundy', name: 'Burgundy', country: 'France', lat: 47.0500, lng: 4.8333, rating: 96, color: '#800080' },
  { id: 'rioja', name: 'Rioja', country: 'Spain', lat: 42.4627, lng: -2.4450, rating: 91, color: '#FF6347' },
  { id: 'barossa', name: 'Barossa Valley', country: 'Australia', lat: -34.5269, lng: 138.8515, rating: 92, color: '#DC143C' },
]

export default function InteractiveGlobe() {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-black via-burgundy-950 to-black rounded-xl overflow-hidden">
      {/* Animated Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="w-96 h-96 text-wine-gold/20" />
        </motion.div>
      </div>
      
      {/* Wine Region Pins */}
      {wineRegions.map((region, index) => {
        // Convert lat/lng to screen coordinates (simplified projection)
        const x = 50 + (region.lng / 180) * 40 // Scale longitude to screen position
        const y = 50 + (region.lat / 90) * -30 // Scale latitude to screen position
        
        return (
          <motion.div
            key={region.id}
            className="absolute group cursor-pointer"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Pin */}
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: region.color }}
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255,255,255,0.4)',
                  '0 0 0 10px rgba(255,255,255,0)',
                  '0 0 0 0 rgba(255,255,255,0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Pin Label */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white min-w-[200px] whitespace-nowrap">
                <h3 className="font-bold text-wine-gold">{region.name}</h3>
                <p className="text-sm text-gray-300">{region.country}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-sm font-semibold">Rating: {region.rating}/100</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
      
      {/* Overlay Controls */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2">Wine Regions</h3>
        <div className="space-y-2">
          {wineRegions.map((region) => (
            <div key={region.id} className="flex items-center gap-2 text-white text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
              {region.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics Panel */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-3">Region Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-white">
            <span>Total Regions:</span>
            <span className="text-wine-gold font-semibold">{wineRegions.length}</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Avg Rating:</span>
            <span className="text-wine-gold font-semibold">
              {(wineRegions.reduce((acc, r) => acc + r.rating, 0) / wineRegions.length).toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between text-white">
            <span>Countries:</span>
            <span className="text-wine-gold font-semibold">
              {new Set(wineRegions.map(r => r.country)).size}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}