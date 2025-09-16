"use client"

import { motion } from 'framer-motion'
import { Wine, Star, TrendingUp, Globe, BarChart3, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Particle System Component (CSS-based)
function ParticleSystem() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-wine-gold/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// Floating Wine Bottles (CSS-based)
function FloatingBottles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[-3, 0, 3].map((x, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${50 + x * 15}%`,
            top: '60%',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <div className="w-16 h-24 bg-gradient-to-b from-wine-gold/20 to-burgundy-900/40 rounded-lg border border-wine-gold/30 flex items-center justify-center">
            <Wine className="w-8 h-8 text-wine-gold" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-burgundy-950 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {mounted && (
          <>
            <ParticleSystem />
            <FloatingBottles />
          </>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Wine className="w-8 h-8 text-wine-gold" />
            </motion.div>
            <span className="text-2xl font-playfair font-bold text-wine-gold">WineVault</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/regions" className="text-white/80 hover:text-wine-gold transition-colors relative group">
              Regions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wine-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/charts" className="text-white/80 hover:text-wine-gold transition-colors relative group">
              Charts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wine-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-white/80 hover:text-wine-gold transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wine-gold transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Sparkles className="w-12 h-12 text-wine-gold animate-pulse" />
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            }}
          >
            Wine Vintage
            <br />
            <span className="text-5xl md:text-6xl">Charts</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the world's finest wine regions through interactive vintage charts, 
            expert ratings, and detailed analysis of the most prestigious vineyards.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/regions">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-wine-gold to-yellow-500 text-black font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-wine-gold transition-all shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore Regions</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.button>
            </Link>
            <Link href="/charts">
              <motion.button
                className="px-8 py-4 border-2 border-wine-gold text-wine-gold font-bold text-lg rounded-lg hover:bg-wine-gold hover:text-black transition-all relative overflow-hidden group backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Charts</span>
                <div className="absolute inset-0 bg-wine-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Wine Glass Animation */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-wine-gold/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <svg
                width="250"
                height="350"
                viewBox="0 0 200 300"
                className="text-wine-gold relative z-10"
              >
                {/* Wine Glass */}
                <motion.path
                  d="M100 20 L80 80 L70 250 L130 250 L120 80 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                {/* Wine Liquid */}
                <motion.path
                  d="M100 80 L85 80 L85 180 Q85 200 100 200 Q115 200 115 180 L115 80 Z"
                  fill="url(#wineGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                {/* Bubbles */}
                <motion.circle
                  cx="95"
                  cy="120"
                  r="2"
                  fill="rgba(255,255,255,0.6)"
                  animate={{ cy: [120, 110, 120] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                  cx="105"
                  cy="140"
                  r="1.5"
                  fill="rgba(255,255,255,0.6)"
                  animate={{ cy: [140, 130, 140] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B0000" />
                    <stop offset="50%" stopColor="#A52A2A" />
                    <stop offset="100%" stopColor="#8B0000" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Globe, label: 'Wine Regions', value: '50+', color: 'text-wine-gold' },
            { icon: Star, label: 'Expert Ratings', value: '10,000+', color: 'text-amber-400' },
            { icon: BarChart3, label: 'Vintage Charts', value: '500+', color: 'text-red-400' },
            { icon: TrendingUp, label: 'Years of Data', value: '100+', color: 'text-green-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-black/60 to-burgundy-900/60 backdrop-blur-lg rounded-xl border border-white/20 hover:border-wine-gold/50 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              </motion.div>
              <motion.div 
                className={`text-3xl font-bold mb-2 ${stat.color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/80 group-hover:text-white transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Regions Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12 text-wine-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Premium Wine Regions
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Bordeaux', country: 'France', rating: 95, description: 'World-renowned for prestigious red blends' },
            { name: 'Napa Valley', country: 'USA', rating: 94, description: 'California\'s premier wine region' },
            { name: 'Tuscany', country: 'Italy', rating: 93, description: 'Home to Sangiovese-based masterpieces' },
          ].map((region, index) => (
            <motion.div
              key={region.name}
              className="p-6 bg-gradient-to-br from-black/60 to-burgundy-900/60 backdrop-blur-lg rounded-xl border border-white/20 hover:border-wine-gold/50 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-2xl font-playfair font-bold text-wine-gold mb-2 group-hover:text-yellow-400 transition-colors">
                {region.name}
              </h3>
              <p className="text-white/60 text-sm mb-3">{region.country}</p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <span className="text-lg font-semibold">{region.rating}/100</span>
              </div>
              <p className="text-white/70 text-sm group-hover:text-white transition-colors">{region.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          className="bg-gradient-to-r from-wine-gold/20 to-burgundy-800/30 backdrop-blur-lg rounded-2xl p-12 border border-wine-gold/30 hover:border-wine-gold/50 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-wine-gold"
            animate={{ textShadow: [
              '0 0 20px rgba(212, 175, 55, 0.5)',
              '0 0 30px rgba(212, 175, 55, 0.8)',
              '0 0 20px rgba(212, 175, 55, 0.5)'
            ] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Start Your Wine Journey
          </motion.h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore detailed vintage charts, expert ratings, and discover your next favorite wine region.
          </p>
          <Link href="/regions">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-wine-gold to-yellow-500 text-black font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-wine-gold transition-all shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}