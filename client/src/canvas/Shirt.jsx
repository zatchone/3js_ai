import React, { useRef } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  
  const logoTextureRef = useRef();
  const fullTextureRef = useRef();

  // Only load textures if they are defined
  const logoTexture = snap.logoDecal ? useTexture(snap.logoDecal) : null;
  const fullTexture = snap.fullDecal ? useTexture(snap.fullDecal) : null;

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    
    // Update texture references
    if (logoTexture) logoTextureRef.current = logoTexture;
    if (fullTexture) fullTextureRef.current = fullTexture;
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && fullTextureRef.current && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTextureRef.current}
          />
        )}

        {snap.isLogoTexture && logoTextureRef.current && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTextureRef.current}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;