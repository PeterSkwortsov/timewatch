import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Watch from "./Watch";

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ progress }) {
  const camera = useRef(null);
  useFrame(() => {
    camera.current.lookAt(0, 0, 0);
  });

  useEffect(() => {



    const updateCameraPosition = () => {
      
       const positions = [
         [3.5, 2.17, 3.7],
         [3.7, 0.6, 0.7],
         [2.3, 2.97, -4.2],
         [-6.5, 1.17, 9.7],
       ];
      
      if (progress > 1) 
      {
      gsap.to(camera.current.position, {
        x: 0,
        y: 2.5,
        z: 3.6,
        duration: 0.5,
        ease: "power1.inOut",
      })
      }
      else {

      const segmentProgress = 1 / 3;
      const segmentIndex = Math.floor(progress / segmentProgress);
      const perentage = (progress % segmentProgress) / segmentProgress;
      const [startX, startY, startZ] = positions[segmentIndex];
      const [endX, endY, endZ] = positions[segmentIndex + 1];

      const x = startX + (endX - startX) * perentage;
      const y = startY + (endY - startY) * perentage;
      const z = startZ + (endZ - startZ) * perentage;

      gsap.to(camera.current.position, {
        x,
        y,
        z,
        duration: 0.5,
        ease: "power1.inOut",
      });}
    };
    updateCameraPosition();
  }, [progress, camera.current]);

  return (
    <>
      {/* <OrbitControls  */}

      <PerspectiveCamera
        fov={65}
        near={0.1}
        far={10000}
        makeDefault
        ref={camera}
        position={[3.5, 2.17, 3.7]}
        
      />
      <Watch  />
      
    </>
  );
}
