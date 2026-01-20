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
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none ${textColor} z-10 selection:bg-blue-500 selection:text-white`}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col md:flex-row justify-between items-start pointer-events-none gap-8 md:gap-0"
            >
                {/* Hero text - left side */}
                <div className="max-w-2xl pointer-events-auto">
                    <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-2">
                        hi, i'm <span className="font-semibold">abhinav</span>
                    </h1>
                    <p className={`text-base md:text-lg ${mutedText} font-sans mb-8`}>
                        I build communities in crypto.
                    </p>

                    <div className={`space-y-4 text-sm md:text-base ${mutedText} font-sans`}>
                        <p>
                            I've been in the crypto space since 2020, farming airdrops and working with various DeFi protocols as a community manager, moderator, and ambassador.
                        </p>
                        <p>
                            I'm currently focused on building my personal brand on X (Twitter), learning the art of consistency through regular posting and networking to grow and improve.
                        </p>
                    </div>

                    {/* Experience Section */}
                    <div className="mt-8">
                        <h2 className="text-lg md:text-xl font-semibold mb-5 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                            Experience
                        </h2>
                        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
                            {/* Superboard */}
                            <div className={`group relative p-4 rounded-xl transition-all duration-300 cursor-default
                                ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                    : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'}
                                hover:translate-x-1 hover:shadow-lg`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'}`}>
                                                Full-time
                                            </span>
                                            <span className={`text-[10px] ${subtleText}`}>Apr 2025 - Jul 2025</span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-semibold group-hover:text-blue-400 transition-colors">Community Manager</h3>
                                        <p className={`text-xs md:text-sm font-medium ${mutedText}`}>Superboard</p>
                                        <p className={`text-xs ${subtleText} mt-2 leading-relaxed`}>Led the management and growth of the Superboard Discord community, enhancing engagement and user experience.</p>
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>

                            {/* Ampleforth */}
                            <div className={`group relative p-4 rounded-xl transition-all duration-300 cursor-default
                                ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                    : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'}
                                hover:translate-x-1 hover:shadow-lg`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-500/20 text-blue-700'}`}>
                                                Part-time
                                            </span>
                                            <span className={`text-[10px] ${subtleText}`}>Dec 2024 - Present</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse
                                                ${theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-500/20 text-green-700'}`}>
                                                Current
                                            </span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-semibold group-hover:text-blue-400 transition-colors">Ambassador</h3>
                                        <p className={`text-xs md:text-sm font-medium ${mutedText}`}>Ampleforth</p>
                                        <p className={`text-xs ${subtleText} mt-2 leading-relaxed`}>Ampleforth is a cryptocurrency protocol designed to create a stable, non-collateralized digital asset called AMPL.</p>
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>

                            {/* Asymmetry Finance */}
                            <div className={`group relative p-4 rounded-xl transition-all duration-300 cursor-default
                                ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                    : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'}
                                hover:translate-x-1 hover:shadow-lg`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-500/20 text-blue-700'}`}>
                                                Part-time
                                            </span>
                                            <span className={`text-[10px] ${subtleText}`}>Nov 2024 - Present</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse
                                                ${theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-500/20 text-green-700'}`}>
                                                Current
                                            </span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-semibold group-hover:text-purple-400 transition-colors">Moderator</h3>
                                        <p className={`text-xs md:text-sm font-medium ${mutedText}`}>Asymmetry Finance</p>
                                        <p className={`text-xs ${subtleText} mt-2 leading-relaxed`}>Asymmetry Finance is the ultimate staking & synthetic dollar protocol - Pioneering DeFi solutions.</p>
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>

                            {/* Armor Wallet */}
                            <div className={`group relative p-4 rounded-xl transition-all duration-300 cursor-default
                                ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                    : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'}
                                hover:translate-x-1 hover:shadow-lg`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'}`}>
                                                Full-time
                                            </span>
                                            <span className={`text-[10px] ${subtleText}`}>Dec 2024</span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-semibold group-hover:text-amber-400 transition-colors">Community Manager</h3>
                                        <p className={`text-xs md:text-sm font-medium ${mutedText}`}>Armor Wallet</p>
                                        <p className={`text-xs ${subtleText} mt-2 leading-relaxed`}>Armor is a new generation of web3 wallets powered by artificial intelligence to bring a higher degree of control over investing.</p>
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>

                            {/* MELD */}
                            <div className={`group relative p-4 rounded-xl transition-all duration-300 cursor-default
                                ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                    : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'}
                                hover:translate-x-1 hover:shadow-lg`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'}`}>
                                                Full-time
                                            </span>
                                            <span className={`text-[10px] ${subtleText}`}>Jun 2021 - Nov 2024</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                                ${theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-700'}`}>
                                                3+ years
                                            </span>
                                        </div>
                                        <h3 className="text-sm md:text-base font-semibold group-hover:text-cyan-400 transition-colors">Community Manager</h3>
                                        <p className={`text-xs md:text-sm font-medium ${mutedText}`}>MELD</p>
                                        <p className={`text-xs ${subtleText} mt-2 leading-relaxed`}>The blockchain you can bank on. Built for speed with permanently low fees, empowered by DeFi. Helped and answered questions from MELD Global community on Telegram, Discord and Reddit.</p>
                                    </div>
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme toggle and Social links - top right */}
                <div className="flex items-center gap-6 text-sm font-sans pointer-events-auto">
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
                        className={`link-underline transition-colors ${mutedText} hover:${textColor}`}
                    >
                        X
                    </a>
                    <a
                        href="https://t.me/unknownking7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`link-underline transition-colors ${mutedText} hover:${textColor}`}
                    >
                        Telegram
                    </a>
                    <a
                        href="https://github.com/unknownking07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`link-underline transition-colors ${mutedText} hover:${textColor}`}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abhinavk7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`link-underline transition-colors ${mutedText} hover:${textColor}`}
                    >
                        LinkedIn
                    </a>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pointer-events-auto max-w-md"
            >
                <p className={`text-sm font-sans ${subtleText}`}>
                    mod @ <a href="https://asymmetry.finance" target="_blank" rel="noopener noreferrer" className={`${mutedText} hover:${textColor} transition-colors`}>Asymmetry Finance</a>
                </p>
            </motion.div>
        </div>
    )
}
