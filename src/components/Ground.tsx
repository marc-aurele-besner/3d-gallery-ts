import * as THREE from 'three'
import React from 'react'
import { usePlane } from '@react-three/cannon'
import { Reflector, useTexture } from '@react-three/drei'

const Ground: React.FC = () => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))
    const color = "#595959"
    const [floor, normal] = useTexture(['/images/surfaceReflectionImperfect.jpg', '/images/surfaceReflectionNormal.jpg'])
    return (
        <mesh ref={ref} position={new THREE.Vector3(0, 0, 0)} rotation={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[24, 24]} />
            
            <Reflector resolution={512} args={[24, 24]} mirror={0.4} mixBlur={2} mixStrength={2} rotation={[-Math.PI / 2, 0, 0]} blur={[400, 100]}>
                {(Material, props) => <Material color={color} metalness={0.4} roughnessMap={floor} normalMap={normal} {...props} />}
            </Reflector>
        </mesh>
    )
}

export default Ground