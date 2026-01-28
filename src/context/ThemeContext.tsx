'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    isTransitioning: boolean
    transitionDirection: 'to-light' | 'to-dark' | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Generate random stars
const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 0.2,
        duration: Math.random() * 0.8 + 0.3
    }))
}

// Generate sun rays
const generateRays = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        rotation: (360 / count) * i,
        length: 60 + Math.random() * 30,
        width: 2 + Math.random() * 2,
        delay: i * 0.015
    }))
}

const stars = generateStars(40)
const rays = generateRays(12)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionDirection, setTransitionDirection] = useState<'to-light' | 'to-dark' | null>(null)
    const [showOverlay, setShowOverlay] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme
        if (saved) {
            setTheme(saved)
        }
    }, [])

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTransitionDirection(newTheme === 'light' ? 'to-light' : 'to-dark')
        setShowOverlay(true)
        setIsTransitioning(true)

        // Change theme quickly
        setTimeout(() => {
            setTheme(newTheme)
        }, 300)

        // End transition faster
        setTimeout(() => {
            setIsTransitioning(false)
        }, 600)

        setTimeout(() => {
            setShowOverlay(false)
            setTransitionDirection(null)
        }, 800)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, transitionDirection }}>
            {/* Celestial Theme Transition Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
                    {/* Sky gradient background */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: transitionDirection === 'to-light'
                                ? 'linear-gradient(to top, #fef3c7, #fde68a, #fbbf24, #f59e0b)'
                                : 'linear-gradient(to top, #0f172a, #1e1b4b, #312e81, #1e1b4b)',
                            animation: 'skyFade 0.5s ease-out forwards'
                        }}
                    />

                    {/* Stars for dark mode */}
                    {transitionDirection === 'to-dark' && (
                        <div className="absolute inset-0">
                            {stars.map((star) => (
                                <div
                                    key={star.id}
                                    className="absolute rounded-full bg-white"
                                    style={{
                                        left: `${star.x}%`,
                                        top: `${star.y}%`,
                                        width: `${star.size}px`,
                                        height: `${star.size}px`,
                                        animation: `starTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite, starAppear 0.3s ease-out ${star.delay}s forwards`,
                                        opacity: 0,
                                        boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)'
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Moon for dark mode - positioned top right */}
                    {transitionDirection === 'to-dark' && (
                        <div
                            className="absolute"
                            style={{
                                top: '15%',
                                right: '15%',
                                animation: 'celestialRise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                            }}
                        >
                            {/* Moon glow */}
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'radial-gradient(circle, rgba(226, 232, 240, 0.4) 0%, transparent 70%)',
                                    top: '-15px',
                                    left: '-15px',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }}
                            />
                            {/* Moon body */}
                            <div
                                className="relative rounded-full"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
                                    boxShadow: '0 0 40px 10px rgba(226, 232, 240, 0.5), inset -10px -10px 20px rgba(148, 163, 184, 0.6)'
                                }}
                            >
                                {/* Moon craters */}
                                <div className="absolute rounded-full bg-slate-400/30" style={{ width: '15px', height: '15px', top: '15px', left: '20px' }} />
                                <div className="absolute rounded-full bg-slate-400/20" style={{ width: '10px', height: '10px', top: '35px', left: '45px' }} />
                                <div className="absolute rounded-full bg-slate-400/25" style={{ width: '8px', height: '8px', top: '50px', left: '25px' }} />
                            </div>
                        </div>
                    )}

                    {/* Sun for light mode - positioned top right */}
                    {transitionDirection === 'to-light' && (
                        <div
                            className="absolute"
                            style={{
                                top: '15%',
                                right: '15%',
                                animation: 'celestialRise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                            }}
                        >
                            {/* Sun rays */}
                            {rays.map((ray) => (
                                <div
                                    key={ray.id}
                                    className="absolute"
                                    style={{
                                        width: `${ray.width}px`,
                                        height: `${ray.length}px`,
                                        background: 'linear-gradient(to top, rgba(251, 191, 36, 0.9), rgba(251, 191, 36, 0))',
                                        left: '35px',
                                        bottom: '35px',
                                        transformOrigin: 'bottom center',
                                        transform: `rotate(${ray.rotation}deg)`,
                                        animation: `rayGrow 0.3s ease-out ${ray.delay}s forwards`,
                                        opacity: 0,
                                        borderRadius: '50%'
                                    }}
                                />
                            ))}

                            {/* Sun outer glow */}
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: '140px',
                                    height: '140px',
                                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(251, 146, 60, 0.2) 40%, transparent 70%)',
                                    top: '-35px',
                                    left: '-35px',
                                    animation: 'pulse 1s ease-in-out infinite'
                                }}
                            />

                            {/* Sun body */}
                            <div
                                className="relative rounded-full"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 30%, #f59e0b 70%, #ea580c 100%)',
                                    boxShadow: '0 0 50px 15px rgba(251, 191, 36, 0.8), 0 0 80px 30px rgba(251, 146, 60, 0.4)'
                                }}
                            />
                        </div>
                    )}

                    {/* Light burst for light mode */}
                    {transitionDirection === 'to-light' && (
                        <div
                            className="absolute"
                            style={{
                                top: 'calc(15% + 40px)',
                                right: 'calc(20% + 40px)',
                                width: '80px',
                                height: '80px',
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)',
                                animation: 'lightBurst 0.5s ease-out forwards'
                            }}
                        />
                    )}

                    {/* Fade out overlay */}
                    <div
                        className="absolute inset-0 transition-opacity duration-300 ease-out"
                        style={{
                            opacity: isTransitioning ? 0 : 1,
                            background: transitionDirection === 'to-light' ? 'white' : '#0f172a',
                            transitionDelay: isTransitioning ? '0ms' : '100ms'
                        }}
                    />
                </div>
            )}
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
