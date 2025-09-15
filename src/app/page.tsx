"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wine, Globe, TrendingUp, Star, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  // Animated counters
  useEffect(() => {
    const timer1 = setInterval(() => {
      setCount1(prev => prev < 2500 ? prev + 50 : 2500)
    }, 30)
    const timer2 = setInterval(() => {
      setCount2(prev => prev < 150 ? prev + 3 : 150)
    }, 30)
    const timer3 = setInterval(() => {
      setCount3(prev => prev < 98 ? prev + 2 : 98)
    }, 30)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wine className="w-6 h-6 text-wine-gold" />
            <span className="text-white font-bold text-xl">Wine Platform</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-white/80 hover:text-white transition">Home</Link>
            <Link href="/regions" className="text-white/80 hover:text-white transition">Regions</Link>
            <Link href="/charts" className="text-white/80 hover:text-white transition">Charts</Link>
            <button className="px-4 py-2 bg-wine-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
              AI Search
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-amber-900/20" />
          {/* Animated Wine Glass SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg width="400" height="600" viewBox="0 0 400 600" className="animate-pulse">
              <defs>
                <linearGradient id="wine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#722F37" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4A1C1F" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Wine Glass Shape */}
              <path d="M 200 100 Q 250 100 250 200 L 230 350 L 200 500 L 200 550 M 200 100 Q 150 100 150 200 L 170 350 L 200 500 M 150 550 L 250 550" 
                stroke="#D4AF37" strokeWidth="3" fill="none" />
              {/* Wine Fill Animation */}
              <path d="M 180 300 Q 200 310 220 300 L 210 350 L 190 350 Z" 
                fill="url(#wine)" className="wine-fill" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            className="text-6xl md:text-8xl font-serif mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Wine Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Premium Wine Intelligence & Vintage Analysis
          </motion.p>

          {/* Animated Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-wine-gold">{count1}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider mt-2">Vintages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-wine-gold">{count2}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider mt-2">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-wine-gold">{count3}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider mt-2">Perfect Scores</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Link href="/regions">
              <button className="group px-8 py-4 bg-gradient-to-r from-wine-burgundy to-red-600 text-white rounded-full text-lg font-semibold hover:from-red-600 hover:to-red-500 transition-all transform hover:scale-105 shadow-2xl">
                <span className="flex items-center gap-2">
                  Explore Regions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <Link href="/charts">
              <button className="group px-8 py-4 glass text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                <span className="flex items-center gap-2">
                  View Charts
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Premium Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-12 h-12 text-wine-gold" />,
                title: "Interactive Maps",
                description: "Explore wine regions with detailed geographical data and climate information."
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-wine-gold" />,
                title: "Vintage Charts",
                description: "Comprehensive vintage analysis with ratings, trends, and investment insights."
              },
              {
                icon: <Sparkles className="w-12 h-12 text-wine-gold" />,
                title: "AI Recommendations",
                description: "Personalized wine suggestions based on your preferences and taste profile."
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
