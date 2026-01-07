'use client'

import * as THREE from 'three'
import { forwardRef } from 'react'
import { Text, RenderTexture, PerspectiveCamera, Image, RoundedBox } from '@react-three/drei'
import { LayerMaterial, Depth, Noise } from 'lamina'

export const ProfileCard = forwardRef(({ onPointerOver, onPointerOut, onPointerUp, onPointerDown, ...props }: any, ref) => {
    return (
        <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
            {...props}
        >
            {/* Metal Clip - Ring at top for lanyard attachment */}
            <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.06, 0.02, 8, 16]} />
                <meshStandardMaterial
                    color="#888888"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Clamp - Metal piece connecting clip to card */}
            <mesh position={[0, 0.52, 0]}>
                <boxGeometry args={[0.12, 0.08, 0.04]} />
                <meshStandardMaterial
                    color="#666666"
                    metalness={0.85}
                    roughness={0.25}
                />
            </mesh>

            {/* Card Body - 3D rounded box with thickness */}
            <RoundedBox
                args={[0.71, 1, 0.03]}
                radius={0.02}
                smoothness={4}
            >
                {/* Premium material with iridescence like Vercel Ship badge */}
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.15}
                    iridescence={1}
                    iridescenceIOR={1.3}
                    iridescenceThicknessRange={[0, 2400]}
                    roughness={0.3}
                    metalness={0.5}
                    envMapIntensity={1.5}
                >
                    <RenderTexture attach="map" height={2048} width={2048} anisotropy={16}>
                        <PerspectiveCamera makeDefault manual aspect={0.71} position={[0, 0, 5]} />
                        <color attach="background" args={['#0a0a0a']} />

                        {/* Subtle gradient background */}
                        <mesh position={[0, 0, -1]}>
                            <planeGeometry args={[10, 14]} />
                            <LayerMaterial
                                lighting="physical"
                                transmission={1}
                                color="#111111"
                            >
                                <Depth colorA="#1a3a5c" colorB="#0a0a0a" alpha={0.5} mode="normal" near={0} far={4} origin={[0, 2, 0]} />
                                <Noise mapping="local" type="cell" scale={0.25} mode="softlight" />
                            </LayerMaterial>
                        </mesh>

                        {/* Halftone dot pattern - bottom left corner */}
                        <group position={[-1.0, -1.8, 0]}>
                            {[...Array(4)].map((_, row) =>
                                [...Array(4)].map((_, col) => (
                                    <mesh key={`${row}-${col}`} position={[col * 0.12, row * 0.12, 0.1]}>
                                        <circleGeometry args={[0.03, 16]} />
                                        <meshBasicMaterial color="#333333" />
                                    </mesh>
                                ))
                            )}
                        </group>

                        {/* Content */}
                        <group position={[0, 0, 0]}>
                            {/* User Photo */}
                            {/* @ts-ignore */}
                            <Image url="/photo.png" scale={[1.4, 1.4, 1]} position={[0, 0.8, 0.1]} />

                            {/* Name - big and bold */}
                            <Text
                                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                                fontSize={0.28}
                                position={[0, -0.35, 0]}
                                color="#ffffff"
                                letterSpacing={-0.05}
                                fontWeight="bold"
                            >
                                ABHINAV
                            </Text>

                            {/* Tagline */}
                            <Text
                                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                                fontSize={0.085}
                                position={[0, -0.58, 0]}
                                color="#888888"
                                letterSpacing={0.02}
                            >
                                I build communities in crypto.
                            </Text>
                        </group>
                    </RenderTexture>
                </meshPhysicalMaterial>
            </RoundedBox>

            {/* Back of card - simple dark material */}
            <mesh position={[0, 0, -0.016]}>
                <planeGeometry args={[0.69, 0.98]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
            </mesh>
        </group>
    )
})

ProfileCard.displayName = 'ProfileCard'
