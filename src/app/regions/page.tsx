"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wine, MapPin, Star, TrendingUp, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const wineRegions = [
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    coordinates: { lat: 44.8378, lng: -0.5792 },
    rating: 95,
    latestVintage: '2020',
    varieties: ['Cabernet Sauvignon', 'Merlot', 'Cabernet Franc'],
    description: 'The world\'s most famous wine region, known for exceptional red blends.',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'napa',
    name: 'Napa Valley',
    country: 'United States',
    coordinates: { lat: 38.5025, lng: -122.2654 },
    rating: 97,
    latestVintage: '2021',
    varieties: ['Cabernet Sauvignon', 'Chardonnay', 'Pinot Noir'],
    description: 'California\'s premier wine region with world-class Cabernet Sauvignon.',
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'tuscany',
    name: 'Tuscany',
    country: 'Italy',
    coordinates: { lat: 43.7711, lng: 11.2486 },
    rating: 93,
    latestVintage: '2021',
    varieties: ['Sangiovese', 'Cabernet Sauvignon', 'Merlot'],
    description: 'Home to Chianti, Brunello di Montalcino, and Super Tuscans.',
    color: 'from-orange-600 to-orange-800'
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    country: 'France',
    coordinates: { lat: 47.0500, lng: 4.8333 },
    rating: 96,
    latestVintage: '2020',
    varieties: ['Pinot Noir', 'Chardonnay'],
    description: 'Renowned for terroir-driven Pinot Noir and Chardonnay wines.',
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'rioja',
    name: 'Rioja',
    country: 'Spain',
    coordinates: { lat: 42.4627, lng: -2.4450 },
    rating: 91,
    latestVintage: '2019',
    varieties: ['Tempranillo', 'Garnacha', 'Graciano'],
    description: 'Spain\'s most prestigious wine region with exceptional aging potential.',
    color: 'from-yellow-600 to-yellow-800'
  },
  {
    id: 'barossa',
    name: 'Barossa Valley',
    country: 'Australia',
    coordinates: { lat: -34.5269, lng: 138.8515 },
    rating: 89,
    latestVintage: '2022',
    varieties: ['Shiraz', 'Grenache', 'Mataro'],
    description: 'Famous for bold Shiraz wines with rich, concentrated flavors.',
    color: 'from-amber-600 to-amber-800'
  }
]

export default function RegionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

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
            <Link href="/regions" className="text-wine-gold font-semibold">Regions</Link>
            <Link href="/charts" className="text-white/80 hover:text-white transition">Charts</Link>
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
            Wine Regions
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore the world's most prestigious wine regions and discover their unique characteristics
          </motion.p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wineRegions.map((region, index) => (
              <motion.div
                key={region.id}
                className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRegion(region.id)}
              >
                {/* Region Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${region.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-wine-gold fill-current" />
                    <span className="text-white font-bold">{region.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{region.country}</span>
                    </div>
                  </div>
                </div>

                {/* Region Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-wine-gold transition">
                    {region.name}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm">
                    {region.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Latest Vintage</p>
                      <p className="text-white font-semibold">{region.latestVintage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Avg Rating</p>
                      <p className="text-wine-gold font-bold">{region.rating}/100</p>
                    </div>
                  </div>

                  {/* Grape Varieties */}
                  <div>
                    <p className="text-white/60 text-sm mb-2">Key Varieties</p>
                    <div className="flex flex-wrap gap-2">
                      {region.varieties.map((variety) => (
                        <span 
                          key={variety}
                          className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full"
                        >
                          {variety}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Region Modal */}
      {selectedRegion && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedRegion(null)}
        >
          <motion.div
            className="glass max-w-2xl w-full rounded-2xl p-8 max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const region = wineRegions.find(r => r.id === selectedRegion)
              if (!region) return null
              
              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">{region.name}</h2>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="text-white/60 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 text-wine-gold" />
                      <span className="text-white">{region.country}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/60">{region.coordinates.lat}, {region.coordinates.lng}</span>
                    </div>
                    
                    <p className="text-white/80">{region.description}</p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Latest Vintage</h4>
                        <p className="text-wine-gold text-2xl font-bold">{region.latestVintage}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Average Rating</h4>
                        <p className="text-wine-gold text-2xl font-bold">{region.rating}/100</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Grape Varieties</h4>
                      <div className="flex flex-wrap gap-2">
                        {region.varieties.map((variety) => (
                          <span 
                            key={variety}
                            className="px-3 py-2 bg-wine-gold/20 text-wine-gold rounded-lg font-medium"
                          >
                            {variety}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                      <Link href={`/charts?region=${region.id}`}>
                        <button className="w-full px-6 py-3 bg-wine-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                          View Vintage Charts
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
