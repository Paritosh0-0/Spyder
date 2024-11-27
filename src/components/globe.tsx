'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useTheme } from 'next-themes'

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const { theme } = useTheme()
  
  useEffect(() => {
    let phi = 0
    let width = 0
    
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: theme === 'dark' ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: theme === 'dark' ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: theme === 'dark' ? [0.1, 0.1, 0.1] : [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.0060], size: 0.03 },
        { location: [51.5074, -0.1278], size: 0.03 },
        { location: [35.6762, 139.6503], size: 0.03 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005
        }
        state.phi = phi + pointerInteractionMovement.current
      }
    })
    
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [theme])
  
  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current
          canvasRef.current!.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          canvasRef.current!.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          canvasRef.current!.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta * 0.01
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta * 0.01
          }
        }}
      />
    </div>
  )
}

