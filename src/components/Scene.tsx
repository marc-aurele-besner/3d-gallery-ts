import * as THREE from 'three'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Stars, OrbitControls } from '@react-three/drei'

import Ground from './Ground'
import Title from './Title'
import BallInstagram from './BallInstagram'
import BallOpenSea from './BallOpenSea'
import BallTwitter from './BallTwitter'
import BallPinterest from './BallPinterest'
import Frames from './Frames'

const Scene: React.FC = () => {
    const startCameraPosition = new THREE.Vector3(0, 1, 6)
    const startCameraFov = 70
    const titlePosition = new THREE.Vector3(0, 2.5, -2.25)
    
    return (
        <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: startCameraFov, position: startCameraPosition }}>
            <color attach="background" args={['#000']} />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <Physics>
                <group position={new THREE.Vector3(0, -0.5, 0)}>
                    <Title position={titlePosition} />
                    <Stars />
                    <ambientLight intensity={0.1} />
                    <Ground />
                        <BallInstagram 
                            scale={[0.15, 0.15, 0.15]} 
                            rotation={new THREE.Euler(-Math.PI / 2 + 1.0, 0.5, 0)} 
                            position={new THREE.Vector3(-0.8, 0.12, 3.5)} />
                        <BallTwitter 
                            scale={[0.15, 0.15, 0.15]} 
                            rotation={new THREE.Euler(-Math.PI / 2 + 1.0, 0.3, 0)} 
                            position={new THREE.Vector3(-0.3, 0.12, 4)} />
                        <BallOpenSea 
                            scale={[0.15, 0.15, 0.15]} 
                            rotation={new THREE.Euler(-Math.PI / 2 + 1.0, -0, 0)} 
                            position={new THREE.Vector3(0.3, 0.12, 4)} />
                        <BallPinterest 
                            scale={[0.15, 0.15, 0.15]} 
                            rotation={new THREE.Euler(-Math.PI / 2 + 1.0, -0.5, 0)} 
                            position={new THREE.Vector3(0.8, 0.12, 3.5)} />
                        {/* <BallWeb3
                            web3={web3}
                            accounts={accounts}
                            setAccounts={setAccounts}
                            scale={(accounts && accounts.length > 0) ? [0.25, 0.25, 0.25] : [0.15, 0.15, 0.15]} 
                            rotation={new THREE.Euler(-Math.PI / 2 + 1.0, 0, 0)}
                            position={accounts ? new THREE.Vector3(0, 0.19, 3.25) : new THREE.Vector3(0, 0.12, 3.25)} /> */}
                        
                        <Frames 
                            q={new THREE.Quaternion()}
                            p={new THREE.Vector3()}
                        />
                </group>
                <OrbitControls maxPolarAngle={Math.PI / 2 - 0.025} minPolarAngle={0}/>
            </Physics>
        </Canvas>
    )
}

export default Scene