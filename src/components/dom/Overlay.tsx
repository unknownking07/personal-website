'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function Overlay() {
    const { theme, toggleTheme } = useTheme()

    // Colors based on theme - using brighter text for better readability
    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const mutedText = theme === 'dark' ? 'text-white/90' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/90'
    const borderColor = theme === 'dark' ? 'border-white/40' : 'border-black/50'

    return (
        <div className={`absolute top-0 left-0 w-full min-h-full flex flex-col p-4 pb-8 md:p-12 pointer-events-auto md:pointer-events-none ${textColor} z-10 selection:bg-blue-500 selection:text-white overflow-y-auto`}>

            {/* Mobile Top Bar with Social Links */}
            <div className="md:hidden flex items-center justify-between mb-4 pointer-events-auto">
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <a href="https://x.com/defiunknownking" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a href="https://t.me/unknownking7" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                    </a>
                    <a href="https://github.com/unknownking07" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/abhinavk7/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>
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
                    <h1 className="text-2xl md:text-5xl font-sans font-medium tracking-tight mb-1 md:mb-2">
                        hi, i'm <span className="font-semibold">abhinav</span>
                    </h1>
                    <p className={`text-sm md:text-lg ${mutedText} font-sans mb-4 md:mb-8`}>
                        I build communities in crypto.
                    </p>

                    <div className={`space-y-2 md:space-y-4 text-xs md:text-base ${mutedText} font-sans`}>
                        <p>
                            I've been in the crypto space since 2020, farming airdrops and working with various DeFi protocols as a community manager, moderator, and ambassador.
                        </p>
                        <p>
                            I'm currently focused on building my personal brand on X (Twitter), learning the art of consistency through regular posting and networking to grow and improve.
                        </p>
                    </div>

                    {/* Experience Section - Terminal/Code Style Bento Grid */}
                    <div className="mt-4 md:mt-8">
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
                </div>

                {/* Theme toggle and Social links - top right - HIDDEN on mobile */}
                <div className="hidden md:flex items-center gap-6 text-sm font-sans pointer-events-auto">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>

                    <a
                        href="https://x.com/defiunknownking"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                        aria-label="X (Twitter)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a
                        href="https://t.me/unknownking7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                        aria-label="Telegram"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/unknownking07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                        aria-label="GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abhinavk7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                        aria-label="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
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
