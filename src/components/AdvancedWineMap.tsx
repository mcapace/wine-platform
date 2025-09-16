"use client"

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Text, Html, Environment } from '@react-three/drei'
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

function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(4, 4, 64, 64)
    const positions = geometry.attributes.position
    
    // Create terrain-like height variation
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const height = Math.sin(x * 2) * Math.cos(y * 2) * 0.1 + 
                    Math.sin(x * 4) * Math.cos(y * 4) * 0.05 +
                    Math.random() * 0.02
      positions.setZ(i, height)
    }
    
    positions.needsUpdate = true
    geometry.computeVertexNormals()
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle terrain animation
      const time = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(time) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[4, 4, 64, 64]} />
      <meshStandardMaterial
        color="#2d5016"
        roughness={0.8}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function WineRegionTerrain({ region }: { region: WineRegion }) {
  const [hovered, setHovered] = useState(false)
  const terrainRef = useRef<THREE.Mesh>(null!)
  const pinRef = useRef<THREE.Mesh>(null!)
  
  // Convert lat/lng to 3D coordinates on terrain
  const x = (region.lng / 180) * 2
  const z = (region.lat / 90) * 2
  const y = region.elevation
  
  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.scale.setScalar(hovered ? 1.5 : 1)
      pinRef.current.position.y = y + Math.sin(state.clock.elapsedTime * 3) * 0.02
    }
    
    if (terrainRef.current) {
      terrainRef.current.rotation.y += 0.001
    }
  })

  return (
    <group position={[x, y, z]}>
      {/* Terrain marker */}
      <mesh
        ref={terrainRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Pin */}
      <mesh ref={pinRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10}>
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
                {region.varieties.map((variety, index) => (
                  <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded">
                    {variety}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function AtmosphericParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = Math.random() * 2 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      // Wine-colored particles
      const color = new THREE.Color()
      color.setHSL(0.05, 0.8, 0.3 + Math.random() * 0.4)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    pointsRef.current.geometry = geometry
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002
      pointsRef.current.rotation.x += 0.0001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        vertexColors
      />
    </points>
  )
}

export default function AdvancedWineMap() {
  const [selectedRegion, setSelectedRegion] = useState<WineRegion | null>(null)
  const [viewMode, setViewMode] = useState<'terrain' | 'globe'>('terrain')

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-black via-burgundy-950 to-black rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 2, 3], fov: 50 }}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#D4AF37" />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#8B0000" />
        
        {viewMode === 'terrain' ? (
          <>
            <TerrainMesh />
            {wineRegions.map((region) => (
              <WineRegionTerrain key={region.id} region={region} />
            ))}
          </>
        ) : (
          <>
            <Sphere args={[1, 64, 64]}>
              <meshStandardMaterial
                color="#1a1a2e"
                roughness={0.8}
                metalness={0.2}
                transparent
                opacity={0.8}
              />
            </Sphere>
            {wineRegions.map((region) => (
              <WineRegionTerrain key={region.id} region={region} />
            ))}
          </>
        )}
        
        <AtmosphericParticles />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
      
      {/* View Controls */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-3">View Mode</h3>
        <div className="space-y-2">
          <motion.button
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              viewMode === 'terrain' ? 'bg-wine-gold text-black' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setViewMode('terrain')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Terrain View
          </motion.button>
          <motion.button
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              viewMode === 'globe' ? 'bg-wine-gold text-black' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setViewMode('globe')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Globe View
          </motion.button>
        </div>
        
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Wine Regions</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {wineRegions.map((region) => (
              <motion.button
                key={region.id}
                className="flex items-center gap-2 text-white text-sm hover:text-wine-gold transition-colors w-full text-left"
                onClick={() => setSelectedRegion(region)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                {region.name}
              </motion.button>
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
      
      {/* Selected Region Info */}
      {selectedRegion && (
        <motion.div
          className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm"
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
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-1">Grape Varieties:</p>
            <div className="flex flex-wrap gap-1">
              {selectedRegion.varieties.map((variety, index) => (
                <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded">
                  {variety}
                </span>
              ))}
            </div>
          </div>
          <button
            className="mt-3 text-white/60 hover:text-white transition-colors text-sm"
            onClick={() => setSelectedRegion(null)}
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  )
}
