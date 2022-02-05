import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/switch.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.track} />
      <mesh geometry={nodes.Sphere.geometry} material={materials.sphere} position={[0, 0.85, -1.41]} />
    </group>
  )
}

useGLTF.preload('/switch.glb')