"use client"

import { motion } from 'framer-motion'
import { MapPin, Star, TrendingUp, Globe } from 'lucide-react'

interface WineRegion {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  rating: number
  color: string
  elevation: number
  varieties: string[]
}

const wineRegions: WineRegion[] = [
  { id: 'bordeaux', name: 'Bordeaux', country: 'France', lat: 44.8378, lng: -0.5792, rating: 95, color: '#8B0000', elevation: 0.1, varieties: ['Cabernet Sauvignon', 'Merlot', 'Cabernet Franc'] },
  { id: 'napa', name: 'Napa Valley', country: 'USA', lat: 38.5025, lng: -122.2654, rating: 94, color: '#D4AF37', elevation: 0.15, varieties: ['Cabernet Sauvignon', 'Chardonnay', 'Merlot'] },
  { id: 'tuscany', name: 'Tuscany', country: 'Italy', lat: 43.7711, lng: 11.2486, rating: 93, color: '#228B22', elevation: 0.12, varieties: ['Sangiovese', 'Canaiolo', 'Colorino'] },
  { id: 'burgundy', name: 'Burgundy', country: 'France', lat: 47.0500, lng: 4.8333, rating: 96, color: '#800080', elevation: 0.08, varieties: ['Pinot Noir', 'Chardonnay'] },
  { id: 'rioja', name: 'Rioja', country: 'Spain', lat: 42.4627, lng: -2.4450, rating: 91, color: '#FF6347', elevation: 0.09, varieties: ['Tempranillo', 'Garnacha', 'Graciano'] },
  { id: 'barossa', name: 'Barossa Valley', country: 'Australia', lat: -34.5269, lng: 138.8515, rating: 92, color: '#DC143C', elevation: 0.13, varieties: ['Shiraz', 'Grenache', 'Cabernet Sauvignon'] },
]

export default function AdvancedWineMap() {
  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-black via-burgundy-950 to-black rounded-xl overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-green-900/20 via-blue-900/20 to-amber-900/20" />
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>
      </div>
      
      {/* Wine Region Markers */}
      {wineRegions.map((region, index) => {
        const x = 50 + (region.lng / 180) * 40
        const y = 50 + (region.lat / 90) * -30
        
        return (
          <motion.div
            key={region.id}
            className="absolute group cursor-pointer"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2, y: -5 }}
          >
            {/* Terrain Marker */}
            <motion.div
              className="relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: region.color }}
              >
                <MapPin className="w-3 h-3 text-white" />
              </div>
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: region.color }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Hover Info */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white min-w-[250px]">
                <h3 className="font-bold text-wine-gold text-lg">{region.name}</h3>
                <p className="text-sm text-gray-300">{region.country}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-sm font-semibold">Rating: {region.rating}/100</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-1">Varieties:</p>
                  <div className="flex flex-wrap gap-1">
                    {region.varieties.map((variety, varietyIndex) => (
                      <span key={varietyIndex} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
      
      {/* View Controls */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-3">Map View</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white text-sm">
            <Globe className="w-4 h-4 text-wine-gold" />
            Interactive Wine Regions
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Live Data Updates
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <Star className="w-4 h-4 text-amber-400" />
            Expert Ratings
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Wine Regions</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {wineRegions.map((region) => (
              <div key={region.id} className="flex items-center gap-2 text-white text-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                {region.name}
              </div>
            ))}
          </div>
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
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">Rating Scale</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 text-white">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>90-100: Exceptional</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>80-89: Very Good</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>70-79: Good</span>
          </div>
        </div>
      </div>
    </div>
  )
}