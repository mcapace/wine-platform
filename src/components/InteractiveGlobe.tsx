"use client"

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

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

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.8}
        metalness={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

function WineRegionPin({ region }: { region: WineRegion }) {
  const [hovered, setHovered] = useState(false)
  const pinRef = useRef<THREE.Mesh>(null!)
  
  // Convert lat/lng to 3D coordinates
  const phi = (90 - region.lat) * (Math.PI / 180)
  const theta = (region.lng + 180) * (Math.PI / 180)
  
  const x = 1.05 * Math.sin(phi) * Math.cos(theta)
  const y = 1.05 * Math.cos(phi)
  const z = 1.05 * Math.sin(phi) * Math.sin(theta)
  
  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.scale.setScalar(hovered ? 1.5 : 1)
      pinRef.current.position.y = y + Math.sin(state.clock.elapsedTime * 2) * 0.02
    }
  })

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={pinRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white min-w-[200px]">
            <h3 className="font-bold text-wine-gold">{region.name}</h3>
            <p className="text-sm text-gray-300">{region.country}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
              <span className="text-sm font-semibold">Rating: {region.rating}/100</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsRef.current.geometry = geometry
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0005
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#D4AF37"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function InteractiveGlobe() {
  const [selectedRegion, setSelectedRegion] = useState<WineRegion | null>(null)

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-black via-burgundy-950 to-black rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#D4AF37" />
        
        <Globe />
        <ParticleField />
        
        {wineRegions.map((region) => (
          <WineRegionPin key={region.id} region={region} />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={5}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay Controls */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2">Wine Regions</h3>
        <div className="space-y-2">
          {wineRegions.map((region) => (
            <motion.button
              key={region.id}
              className="flex items-center gap-2 text-white text-sm hover:text-wine-gold transition-colors"
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
              {region.name}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Selected Region Info */}
      {selectedRegion && (
        <motion.div
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h3 className="text-wine-gold font-bold text-lg">{selectedRegion.name}</h3>
          <p className="text-white/80 text-sm">{selectedRegion.country}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-white">Rating:</span>
            <span className="font-bold text-wine-gold">{selectedRegion.rating}/100</span>
          </div>
          <button
            className="mt-3 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelectedRegion(null)}
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  )
}
