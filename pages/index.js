import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Sky, Cloud, Text, CubeCamera } from '@react-three/drei'

function Plane() {
  return (
    <mesh position={[0, 10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshLambertMaterial attach="material" wireframe="true" />
    </mesh>
  );
}

export default function Home() {
  
  const [shouldHide, setShouldHide] = useState(false);

  const disappear = () => {
    let text = document.querySelector('.home');
    if(text) text.style.setProperty('opacity', '0');
    setTimeout( () => {setShouldHide(true)}, 1000);
  };

  useEffect(() => {
    setTimeout(disappear, 500);
  }, []);

  const cam = useRef();

  return (
    <>
    { !shouldHide && <h1 className="home">welcome to sticky</h1> }
    
    <Canvas id="bg">

      <PerspectiveCamera fov={75} position={[0, 100, 500]}>
        <mesh ref={cam}>
    
        </mesh>
      </PerspectiveCamera>

      <ambientLight intensity={0.5} />
      <pointLight position={[40, 40, 40]} angle={0.3} />

      <Stars />
      

      {/* <Text fontSize={50} anchorX="center" anchorY="middle" position={[0, 0, 300]} >
        Hello World!
      </Text>  */}

      <OrbitControls />
    </Canvas>
    </>
  )
}