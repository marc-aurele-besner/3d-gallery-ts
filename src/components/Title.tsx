import * as THREE from 'three'
import React from 'react'
import { useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'

interface TitleProps {
  position: THREE.Vector3
}

const firstBackground = 1
const lastBackground = 7
const randomNfts = Math.floor(Math.random() * (lastBackground - firstBackground + 1) + firstBackground)

const TextTitle: React.FC<TitleProps> = ({ position }) => {
  const texture = useLoader(THREE.TextureLoader, `/images/backgrounds/${randomNfts}.jpg`)
  return (
    <Text font="/fonts/Inter-Bold.woff" fontSize={1.25} letterSpacing={-0.06} position={new THREE.Vector3(position.x, position.y, position.z + 0.35)}>
      Collage of Myself
      <meshBasicMaterial toneMapped={false} attach="material" map={texture} />
    </Text>
  )
}

const Title: React.FC<TitleProps> = ({ position }) => {
    return (
      <>
        <group>
          <mesh
            scale={[10, 1.5, 0.1]}
            position={new THREE.Vector3(position.x, position.y - 0.1, position.z + 0.25)}>
            <boxGeometry />
            <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          </mesh>
        </group>
        <group>
          <mesh
            scale={[0.2, 2.3 , 0.075]}
            position={new THREE.Vector3(position.x - 4, position.y - 1.9 , position.z + 0.25)}>
            <boxGeometry />
            <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          </mesh>
          <mesh
            scale={[0.2, 2.3 , 0.075]}
            position={new THREE.Vector3(position.x + 4, position.y - 1.9 , position.z + 0.25)}>
            <boxGeometry />
            <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          </mesh>
        </group>
       <TextTitle position={position} />
        <group rotation={new THREE.Euler(0, Math.PI, 0)} position={new THREE.Vector3(0, 0, -3.975)}>
          <TextTitle position={position} />
        </group>
      </>
    ) 
}

export default Title