import * as THREE from 'three'
import React, { useEffect, useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { useCursor, Image, Text } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useRoute, useLocation } from 'wouter'
import spotList, { SpotDetails } from "../constants/SpotList"
// import getUuid from 'uuid-by-string'

const openSeaChainPrefix = 'matic'
const contractAddress = '0xfdea628f49897c49a8d7824ab286e236e42d4f8f'

interface FramesProps {
    q: THREE.Quaternion
    p: THREE.Vector3
}

const Frames: React.FC<FramesProps> = ({ q, p }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref: any = useRef()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clicked: any = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
      clicked.current = ref.current.getObjectByName(params?.id)
      if (clicked.current) { 
     //   setNftSelected(true)
     //   setNftIdSelected(params?.id ? parseInt(params?.id, 10) : 0)
      }
      else { 
     //   setNftSelected(false) 
     //   setNftIdSelected(0)
      }
      if (clicked.current) {
        clicked.current.parent.updateWorldMatrix(true, true)
        clicked.current.parent.localToWorld(p.set(0, 1 / 2, 2))
        clicked.current.parent.getWorldQuaternion(q)
      } else {
       /* if(spotIdSelected > 0) {
          p.set(-Math.PI / 2, 0, 5.5)
        }
        else { */
          p.set(0, 0, 5.5)
      //  }
        q.identity()
      }
    })
    useFrame((state, dt) => {
      //if(!isFreeMovement) {
        state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt))
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt))
      //}
    /*  else {
        if(movement !== '') {
          if (movement === 'up') {
            state.camera.position.z -= 0.2
            state.camera.getWorldPosition(state.camera.position)
          }
          if (movement === 'down') {
            state.camera.position.z += 0.2
            state.camera.updateWorldMatrix(true, true)
            state.camera.getWorldPosition(state.camera.position)
          }
          if (movement === 'left') {
            state.camera.position.x -= 0.2
            state.camera.updateWorldMatrix(true, true)
            state.camera.getWorldPosition(state.camera.position)
          }
          if (movement === 'right') {
            state.camera.position.x += 0.2
            state.camera.updateWorldMatrix(true, true)
            state.camera.getWorldPosition(state.camera.position)
          }
          setMovement('')
        }
      } */
    })
    return (
        <group
          ref={ref}
          key={ref}
          onClick={(e) => {
            (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))
           // setIsFreeMovement(false)
          }}
          onPointerMissed={() => setLocation('/')}>
              {spotList.map((props : SpotDetails) => (
                <>
                    <Frame 
                        key={props.url} 
                        c={new THREE.Color()}
                        {...props} 
                    /> 
                </>
                )
                )}
        </group>
    )
}

interface FrameProps  {
    spotId: number
    url: string
    tokenId: number
    c: THREE.Color
  }
  
const Frame: React.FC<FrameProps> = ({
  spotId,
  url, 
  tokenId, 
  c, 
  ...props }) => {
    const [ref] = useBox(() => ({
      type: 'Static',
      scale: [1, 1, 0.05],
      position: [0, 1 / 2, 0]
  }))
    const [hovered, hover] = useState(false)
    const [titleHovered, setTitleHover] = useState(false)
    const [rnd] = useState(() => Math.random())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image: any = useRef()
    const name = spotId.toString()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const frame: any = useRef()
    const osLink = `https://opensea.io/assets/${openSeaChainPrefix}/${contractAddress}/${tokenId}`
    useCursor(hovered)
    useCursor(titleHovered)
    useFrame((state) => {
     // if(focus && !stopAutoZoom && (nftIdSelected > 0 || nftIdSelected === nftId)) {
     // if(!stopAutoZoom) {
        image.current.material.zoom = 1.25 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
     // }
        image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.80 : 1), 0.1)
        image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.915 : 1), 0.1)
        frame.current.material.color.lerp(c.set(hovered ? 'grey' : 'white').convertSRGBToLinear(), 0.1)
    //  }
    })
    return (
      <group {...props}>
        <mesh
          ref={ref}
          name={name}
          onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          onPointerOut={() => hover(false)}
          scale={[1, 1, 0.05]}
          position={[0, 1 / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.1]} position={[0, 0, 0.6]}>
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
            <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
          </mesh>
        </mesh>
        <Text 
          maxWidth={0.1} 
          anchorX="left" 
          anchorY="top" 
          position={[0.55, 1, 0]} 
          fontSize={0.025} 
          onClick={() => window.open(osLink, '_blank')} 
          onPointerOver={(e) => (e.stopPropagation(), setTitleHover(true))}
          onPointerOut={() => setTitleHover(false)}>
          #{tokenId} Open on OpenSea
        </Text>
      </group>
    )
}

export default Frames