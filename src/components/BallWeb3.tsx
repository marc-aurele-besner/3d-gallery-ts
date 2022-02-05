import * as THREE from 'three'
import React, { useState, useEffect, useCallback } from "react"
import { useTexture, Shadow } from "@react-three/drei"

interface BallWeb3Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  web3: any
  accounts: string[]
  setAccounts: (accounts: string[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scale: any
  position: THREE.Vector3
  rotation: THREE.Euler
}

const BallWeb3: React.FC<BallWeb3Props> = ({ 
  web3, 
 // accounts, 
  setAccounts, 
  scale, 
  position, 
  rotation 
}) => {
    const texture = useTexture("/textures/ballWeb3UvMap.jpg")
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
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              web3.eth.getAccounts().then((accounts: any) => {
                  console.log(accounts)
                  setAccounts(accounts)
              })}}>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshStandardMaterial roughness={0.5} map={texture} />
          </mesh>
          <Shadow renderOrder={-1000} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]} />
        </group>
      </group>
    )
}

export default BallWeb3