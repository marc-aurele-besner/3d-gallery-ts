import * as THREE from 'three'
import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Loader } from '@react-three/drei'
import Scene from './components/Scene'
import './styles.css'

const App = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Scene />
            </Suspense>
            <Loader />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))