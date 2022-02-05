import * as THREE from 'three'
import React, { useState, useEffect, useCallback } from "react"
import { useTexture, Shadow } from "@react-three/drei"

interface BallPinterestProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scale: any
  position: THREE.Vector3
  rotation: THREE.Euler
}

const BallPinterest: React.FC<BallPinterestProps> = ({ scale, position, rotation }) => {
    const texture = useTexture("/textures/ballPinterestUvMap.jpg")
    // Hover state
    const [hovered, setHover] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
    // Events
    const onPointerOver = useCallback(() => setHover(true), [])
    const onPointerOut = useCallback(() => setHover(false), [])
    // Interpolations
    return (
      <group dispose={null} scale={scale} position={position} rotation={rotation} >
        <group>
          <mesh receiveShadow castShadow onPointerOver={onPointerOver} onPointerOut={onPointerOut} 
            onClick={() => window.open('https://www.pinterest.ca/collageofmyself', '_blank')}>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshStandardMaterial roughness={0.5} map={texture} />
          </mesh>
          <Shadow renderOrder={-1000} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]} />
        </group>
      </group>
    )
}

export default BallPinterest