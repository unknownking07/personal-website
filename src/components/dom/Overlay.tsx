'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

export default function Overlay() {
    const { theme, toggleTheme } = useTheme()
    const [visitorCount, setVisitorCount] = useState<number>(0)

    // Initialize visitor counter from localStorage
    useEffect(() => {
        const storedCount = localStorage.getItem('visitorCount')
        const count = storedCount ? parseInt(storedCount, 10) + 1 : 1
        localStorage.setItem('visitorCount', count.toString())
        setVisitorCount(count)
    }, [])

    // Colors based on theme - using brighter text for better readability
    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const mutedText = theme === 'dark' ? 'text-white/90' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/90'
    const borderColor = theme === 'dark' ? 'border-white/40' : 'border-black/50'

    return (
        <div className={`absolute top-0 left-0 w-full min-h-full flex flex-col p-4 pb-8 md:p-12 pointer-events-auto md:pointer-events-none ${textColor} z-10 selection:bg-blue-500 selection:text-white overflow-y-auto`}>

            {/* Navigation Bar - Quionie Style */}
            <nav className="flex items-center justify-between mb-6 pointer-events-auto">
                {/* Left side - Site name/logo */}
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                        abhinav
                    </span>
                </div>

                {/* Center/Right - Navigation links */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Navigation Links */}
                    <Link
                        href="/blog"
                        className={`text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                        BLOG
                    </Link>
                    <button
                        onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                        PROJECT
                    </button>

                    {/* Visitor Counter with Eye Icon */}
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] ${theme === 'dark' ? 'bg-white/5 text-stone-400' : 'bg-black/5 text-stone-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="font-mono">{visitorCount}</span>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10 text-stone-400 hover:text-white' : 'hover:bg-black/10 text-stone-500 hover:text-stone-900'}`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mb-6 pointer-events-auto">
                <a href="https://x.com/defiunknownking" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-stone-400 hover:text-white' : 'hover:bg-black/10 text-stone-500 hover:text-stone-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
                <a href="https://t.me/unknownking7" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-stone-400 hover:text-white' : 'hover:bg-black/10 text-stone-500 hover:text-stone-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                </a>
                <a href="https://github.com/unknownking07" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-stone-400 hover:text-white' : 'hover:bg-black/10 text-stone-500 hover:text-stone-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/abhinavk7/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-stone-400 hover:text-white' : 'hover:bg-black/10 text-stone-500 hover:text-stone-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>
            </div>

            {/* Header - Desktop layout */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col md:flex-row justify-between items-start pointer-events-none gap-4 md:gap-0 flex-grow"
            >
                {/* Hero text - left side */}
                <div className="max-w-2xl pointer-events-auto">
                    <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-2">
                        hi, i'm <span className="font-semibold">abhinav</span>
                    </h1>
                    <p className={`text-lg ${mutedText} font-sans mb-6 md:mb-8`}>
                        I build communities in crypto.
                    </p>

                    <div className={`space-y-4 text-base ${mutedText} font-sans`}>
                        <p>
                            I've been in the crypto space since 2020, farming airdrops and working with various DeFi protocols as a community manager, moderator, and ambassador.
                        </p>
                        <p>
                            I'm currently focused on building my personal brand on X (Twitter), learning the art of consistency through regular posting and networking to grow and improve.
                        </p>
                    </div>

                    {/* Experience Section - Terminal/Code Style Bento Grid */}
                    <div className="mt-6 md:mt-8">
                        {/* Terminal Header */}
                        <div className={`flex items-center gap-2 mb-0 px-3 py-2 rounded-t-lg ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className={`text-xs font-mono ${subtleText} ml-2`}>~/abhinav/experience</span>
                        </div>

                        {/* Bento Grid */}
                        <div className={`p-3 md:p-4 rounded-b-lg ${theme === 'dark' ? 'bg-zinc-900/80' : 'bg-zinc-100/80'} backdrop-blur-sm`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">

                                {/* MELD - Large Featured Card */}
                                <div className={`md:col-span-2 group relative overflow-hidden rounded-xl p-3 md:p-4 transition-all duration-300 cursor-default
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50'
                                        : 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/30 hover:border-cyan-500/60'}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`font-mono text-xs ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>const</span>
                                                <span className={`font-mono text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>meld</span>
                                                <span className={`font-mono text-xs ${subtleText}`}>=</span>
                                                <span className={`font-mono text-xs ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>{"{"}</span>
                                            </div>
                                            <div className="pl-4 space-y-1 font-mono text-[11px]">
                                                <p><span className={`${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>role:</span> <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>"Community Manager"</span></p>
                                                <p><span className={`${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>duration:</span> <span className={`${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>"3+ years"</span> <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-700'}`}>FEATURED</span></p>
                                                <p><span className={`${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>period:</span> <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>"Jun 2021 → Nov 2024"</span></p>
                                                <p className={`${subtleText} mt-1`}>// The blockchain you can bank on</p>
                                            </div>
                                            <span className={`font-mono text-xs ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>{"}"}</span>
                                        </div>

                                    </div>
                                    {/* Animated line */}
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>

                                {/* Asymmetry Finance */}
                                <div className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 cursor-default
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/20 hover:border-sky-400/50'
                                        : 'bg-gradient-to-br from-sky-500/5 to-cyan-500/5 border border-sky-500/30 hover:border-sky-500/60'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>ACTIVE</span>
                                        </div>
                                    </div>
                                    <h3 className={`font-mono text-sm font-bold mb-1 ${theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}`}>Asymmetry</h3>
                                    <p className={`text-xs font-medium ${mutedText}`}>Moderator</p>
                                    <p className={`text-[10px] ${subtleText} mt-1 font-mono`}>Nov 2024 → now</p>
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>

                                {/* Ampleforth */}
                                <div className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 cursor-default
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 hover:border-blue-400/50'
                                        : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/30 hover:border-blue-500/60'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>ACTIVE</span>
                                        </div>

                                    </div>
                                    <h3 className={`font-mono text-sm font-bold mb-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>Ampleforth</h3>
                                    <p className={`text-xs font-medium ${mutedText}`}>Ambassador</p>
                                    <p className={`text-[10px] ${subtleText} mt-1 font-mono`}>Dec 2024 → now</p>
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>

                                {/* Superboard */}
                                <div className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 cursor-default
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-400/50'
                                        : 'bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/30 hover:border-emerald-500/60'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'}`}>FULL-TIME</span>

                                    </div>
                                    <h3 className={`font-mono text-sm font-bold mb-1 ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>Superboard</h3>
                                    <p className={`text-xs font-medium ${mutedText}`}>Community Manager</p>
                                    <p className={`text-[10px] ${subtleText} mt-1 font-mono`}>Apr → Jul 2025</p>
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>

                                {/* Armor Wallet */}
                                <div className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 cursor-default
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-400/50'
                                        : 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/30 hover:border-amber-500/60'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-500/20 text-amber-700'}`}>FULL-TIME</span>

                                    </div>
                                    <h3 className={`font-mono text-sm font-bold mb-1 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>Armor Wallet</h3>
                                    <p className={`text-xs font-medium ${mutedText}`}>Community Manager</p>
                                    <p className={`text-[10px] ${subtleText} mt-1 font-mono`}>Dec 2024</p>
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>

                            {/* Terminal prompt */}
                            <div className={`mt-4 pt-3 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                                <p className={`font-mono text-xs ${subtleText} flex items-center gap-2`}>
                                    <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>→</span>
                                    <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>building communities since</span>
                                    <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>2020</span>
                                    <span className="animate-pulse">▋</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section - Terminal/Code Style */}
                    <div className="mt-6 md:mt-8" id="projects-section">
                        {/* Terminal Header */}
                        <div className={`flex items-center gap-2 mb-0 px-3 py-2 rounded-t-lg ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className={`text-xs font-mono ${subtleText} ml-2`}>~/abhinav/projects</span>
                        </div>

                        {/* Projects Content */}
                        <div className={`p-3 md:p-4 rounded-b-lg ${theme === 'dark' ? 'bg-zinc-900/80' : 'bg-zinc-100/80'} backdrop-blur-sm`}>
                            {/* Tweet Preview Card */}
                            <a
                                href="https://x.com/defiunknownking/status/2018227837090791823"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative overflow-hidden rounded-xl p-3 md:p-4 transition-all duration-300 block
                                    ${theme === 'dark'
                                        ? 'bg-black border border-zinc-700/50 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-black/20'
                                        : 'bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-200/50'}`}
                            >
                                {/* Tweet Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    {/* Profile Picture */}
                                    <img
                                        src="https://pbs.twimg.com/profile_images/1865224045312245760/ov_dlSI7_400x400.jpg"
                                        alt="abhinav"
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <span className={`font-bold text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>abhinav</span>
                                            <svg viewBox="0 0 22 22" className="w-4 h-4 text-blue-500 flex-shrink-0">
                                                <path fill="currentColor" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                                            </svg>
                                        </div>
                                        <span className={`text-xs md:text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>@defiunknownking · Feb 2, 2026</span>
                                    </div>
                                    {/* X Logo */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>

                                {/* Tweet Content */}
                                <div className={`text-sm md:text-base leading-relaxed mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    <p className="mb-2">i got tired of missing good crypto job listings</p>
                                    <p className="mb-2">so i vibe coded a simple aggregator: all web3 jobs, all in one site.</p>
                                    <p className="mb-2">would love feedback from job hunters + founders hiring 👀</p>
                                    <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>[ link is under the comments ]</p>
                                </div>

                                {/* Video Preview with Thumbnail */}
                                <div className={`rounded-xl overflow-hidden border relative ${theme === 'dark' ? 'border-zinc-700/50' : 'border-zinc-200'}`}>
                                    {/* Video Thumbnail - actual Twitter video thumbnail */}
                                    <div className={`aspect-video relative ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                                        <img
                                            src="https://pbs.twimg.com/amplify_video_thumb/2018227441404440576/img/z2mCvD5El9sortBD.jpg"
                                            alt="CryptoJobsHub Demo Video"
                                            className="w-full h-full object-cover absolute inset-0 z-10"
                                        />
                                        {/* Play button overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-sm'} hover:bg-black/60 transition-colors`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 md:w-8 md:h-8 ml-1">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Video duration */}
                                        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-medium z-20">
                                            0:47
                                        </div>
                                    </div>
                                </div>

                                {/* Tweet Engagement - Full Twitter Style */}
                                <div className={`flex items-center justify-between mt-3 pt-3 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
                                    {/* Comments */}
                                    <div className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-500 hover:text-blue-400' : 'text-zinc-500 hover:text-blue-500'} transition-colors cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                        </svg>
                                        <span>64</span>
                                    </div>
                                    {/* Reposts */}
                                    <div className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-500 hover:text-green-400' : 'text-zinc-500 hover:text-green-500'} transition-colors cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                        </svg>
                                        <span>14</span>
                                    </div>
                                    {/* Likes */}
                                    <div className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-500 hover:text-pink-400' : 'text-zinc-500 hover:text-pink-500'} transition-colors cursor-pointer`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        <span>142</span>
                                    </div>
                                    {/* Views */}
                                    <div className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        <span>9.4K</span>
                                    </div>
                                    {/* Bookmark & Share */}
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500 hover:text-blue-400' : 'text-zinc-500 hover:text-blue-500'} transition-colors cursor-pointer`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500 hover:text-blue-400' : 'text-zinc-500 hover:text-blue-500'} transition-colors cursor-pointer`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-600 w-0 group-hover:w-full transition-all duration-500"></div>
                            </a>

                            {/* Quick Links */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                <a
                                    href="https://cryptojobshub.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                        ${theme === 'dark'
                                            ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20'
                                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                    Live Demo
                                </a>
                                <a
                                    href="https://github.com/unknownking07/cryptojobshub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                        ${theme === 'dark'
                                            ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    Source Code
                                </a>
                            </div>

                            {/* Terminal prompt */}
                            <div className={`mt-4 pt-3 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                                <p className={`font-mono text-xs ${subtleText} flex items-center gap-2`}>
                                    <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>→</span>
                                    <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>more projects</span>
                                    <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>coming soon...</span>
                                    <span className="animate-pulse">▋</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pointer-events-auto w-full mt-8"
            >
                <p className={`text-sm font-sans ${subtleText} text-center md:text-left`}>
                    mod @ <a href="https://asymmetry.finance" target="_blank" rel="noopener noreferrer" className={`${mutedText} hover:${textColor} transition-colors`}>Asymmetry Finance</a>
                </p>
            </motion.div>
        </div>
    )
}
