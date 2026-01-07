'use client'

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, Text, RenderTexture, PerspectiveCamera, Image, useTexture } from '@react-three/drei'
import { LayerMaterial, Depth, Noise, Fresnel } from 'lamina'

// Preload the Vercel tag model
useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

// Card component - using exact Vercel GLTF assets
export const Card = forwardRef(({ onPointerOver, onPointerOut, onPointerUp, onPointerDown, ...props }: any, ref) => {
    // Load the model
    const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb') as any

    return (
        <group
            scale={3}
            position={[0, -1.2, -0.05]}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
            {...props}
        >
            {/* Card mesh - using Vercel geometry */}
            <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                    color="#111111"
                    clearcoat={1}
                    clearcoatRoughness={0.15}
                    roughness={0.3}
                    metalness={0.5}
                >
                    {/* Render the dynamic content onto the texture */}
                    <RenderTexture attach="map" height={2000} width={2000} anisotropy={16}>
                        <BadgeTexture />
                    </RenderTexture>
                </meshPhysicalMaterial>
            </mesh>

            {/* Clip mesh - from GLTF */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />

            {/* Clamp mesh - from GLTF */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
    )
})

Card.displayName = 'Card'

// Badge texture scene - clean minimal design
function BadgeTexture() {
    return (
        <>
            <PerspectiveCamera makeDefault manual aspect={1.05} position={[0.49, 0.22, 2]} />
            <color attach="background" args={['#0a0a0a']} />

            {/* Dark background */}
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[3.2, 4.5]} />
                <meshBasicMaterial color="#0a0a0a" />
            </mesh>

            {/* All content - using scale to correct RenderTexture orientation */}
            <group scale={[1, -1, 1]}>
                {/* Vercel triangle logo - top left */}
                <group position={[-0.85, 0.95, 0.1]}>
                    <mesh rotation={[0, 0, 0]}>
                        <circleGeometry args={[0.06, 3]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>

                {/* Name - centered */}
                <Text
                    font="https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4deyC4E.ttf"
                    fontSize={0.22}
                    position={[0, -0.2, 0.1]}
                    color="#ffffff"
                    fontWeight={700}
                    anchorX="center"
                    anchorY="middle"
                >
                    Abhinav
                </Text>

                {/* Tagline - different font, positioned lower */}
                <Text
                    font="https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4E.ttf"
                    fontSize={0.055}
                    position={[0, -0.38, 0.1]}
                    color="#888888"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.02}
                >
                    i build communities in crypto
                </Text>

                {/* Decorative squares - right side */}
                <mesh position={[0.65, -0.55, 0.1]}>
                    <planeGeometry args={[0.08, 0.08]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.65, -0.65, 0.1]}>
                    <planeGeometry args={[0.08, 0.03]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Bottom branding line */}
                <mesh position={[0, -0.88, 0.1]}>
                    <planeGeometry args={[1.6, 0.002]} />
                    <meshBasicMaterial color="#333333" />
                </mesh>

                {/* Vercel Ship text at bottom */}
                <Text
                    font="https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4E.ttf"
                    fontSize={0.055}
                    position={[-0.55, -0.98, 0.1]}
                    color="#666666"
                    anchorX="left"
                    anchorY="middle"
                >
                    Vercel Ship
                </Text>

                {/* Small triangle next to branding */}
                <group position={[-0.2, -0.98, 0.1]}>
                    <mesh rotation={[0, 0, 0]}>
                        <circleGeometry args={[0.025, 3]} />
                        <meshBasicMaterial color="#666666" />
                    </mesh>
                </group>
            </group>
        </>
    )
}
