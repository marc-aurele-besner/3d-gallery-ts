import * as THREE from 'three'

export interface SpotDetails {
    spotId: number
    position: THREE.Vector3
    rotation: THREE.Euler
    scale: number[]
    url: string
    tokenId: number
    tokenContract: string
}

const collageOfMyselfContractAddress = '0xfdEA628F49897C49a8D7824aB286e236e42D4F8F'
const spotList: SpotDetails[] = [
    // Center Focus
    {
        spotId: 1,
        position: new THREE.Vector3(0, 0, 1.5),
        rotation: new THREE.Euler(0, 0, 0),
        scale: [1, 1, 1],
        url: `/nfts/206.jpg`,
        tokenId: 206,
        tokenContract: collageOfMyselfContractAddress,
    },
    // Center-Left
    {
        spotId: 2,
        position: new THREE.Vector3(-2.4, 0, -0.6),
        rotation: new THREE.Euler(0, 0.25, 0),
        scale: [1, 1, 1],
        url: `/nfts/1.jpg`,
        tokenId: 1,
        tokenContract: collageOfMyselfContractAddress,
    },
    {
        spotId: 3,
        position: new THREE.Vector3(-3.7, 0, -0.6),
        rotation: new THREE.Euler(0, 0.25, 0),
        scale: [1, 1, 1],
        url: `/nfts/133.jpg`,
        tokenId: 133,
        tokenContract: collageOfMyselfContractAddress,
    },
    // Center-Right
    {
        spotId: 4,
        position: new THREE.Vector3(2.4, 0, -0.6),
        rotation: new THREE.Euler(0, -0.25, 0),
        scale: [1, 1, 1],
        url: `/nfts/316.jpg`,
        tokenId: 316,
        tokenContract: collageOfMyselfContractAddress,
    },
    {
        spotId: 5,
        position: new THREE.Vector3(3.7, 0, -0.6),
        rotation: new THREE.Euler(0, -0.25, 0),
        scale: [1, 1, 1],
        url: `/nfts/208.jpg`,
        tokenId: 208,
        tokenContract: collageOfMyselfContractAddress,
    }
]

export default spotList