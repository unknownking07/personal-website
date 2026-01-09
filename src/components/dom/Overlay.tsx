import { motion } from 'framer-motion'

export default function Overlay() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none text-white z-10 selection:bg-blue-500 selection:text-white">

            {/* Header - minimal like dakshie */}
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
                    <p className="text-base md:text-lg text-white/60 font-sans mb-8">
                        I build communities in crypto.
                    </p>

                    <div className="space-y-4 text-sm md:text-base text-white/50 font-sans">
                        <p>
                            i’ve been in the crypto space since 2020 — farming airdrops and working with various defi protocols as a community manager, moderator, and ambassador.
                        </p>
                        <p>
                            i’m currently focused on building my personal brand on X(twitter), learning the art of consistency through regular posting and networking to grow and improve.
                        </p>
                    </div>

                    {/* Experience Section */}
                    <div className="mt-8">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white/80">Experience</h2>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                            {/* Superboard */}
                            <div className="border-l-2 border-white/20 pl-4 py-1">
                                <h3 className="text-sm md:text-base font-medium text-white/90">Community Manager</h3>
                                <p className="text-xs md:text-sm text-white/60">Superboard · Full-time</p>
                                <p className="text-xs text-white/40">Apr 2025 - Jul 2025 · Remote</p>
                                <p className="text-xs text-white/50 mt-1">Led the management and growth of the Superboard Discord community, enhancing engagement and user experience.</p>
                            </div>

                            {/* Ampleforth */}
                            <div className="border-l-2 border-white/20 pl-4 py-1">
                                <h3 className="text-sm md:text-base font-medium text-white/90">Ambassador</h3>
                                <p className="text-xs md:text-sm text-white/60">Ampleforth · Part-time</p>
                                <p className="text-xs text-white/40">Dec 2024 - Present · Remote</p>
                                <p className="text-xs text-white/50 mt-1">Ampleforth is a cryptocurrency protocol designed to create a stable, non-collateralized digital asset called AMPL.</p>
                            </div>

                            {/* Asymmetry Finance */}
                            <div className="border-l-2 border-white/20 pl-4 py-1">
                                <h3 className="text-sm md:text-base font-medium text-white/90">Moderator</h3>
                                <p className="text-xs md:text-sm text-white/60">Asymmetry Finance · Part-time</p>
                                <p className="text-xs text-white/40">Nov 2024 - Present · Remote</p>
                                <p className="text-xs text-white/50 mt-1">Asymmetry Finance is the ultimate staking & synthetic dollar protocol - Pioneering DeFi solutions.</p>
                            </div>

                            {/* Armor Wallet */}
                            <div className="border-l-2 border-white/20 pl-4 py-1">
                                <h3 className="text-sm md:text-base font-medium text-white/90">Community Manager</h3>
                                <p className="text-xs md:text-sm text-white/60">Armor Wallet · Full-time</p>
                                <p className="text-xs text-white/40">Dec 2024 · Remote</p>
                                <p className="text-xs text-white/50 mt-1">Armor is a new generation of web3 wallets powered by artificial intelligence to bring a higher degree of control over investing.</p>
                            </div>

                            {/* MELD */}
                            <div className="border-l-2 border-white/20 pl-4 py-1">
                                <h3 className="text-sm md:text-base font-medium text-white/90">Community Manager</h3>
                                <p className="text-xs md:text-sm text-white/60">MELD · Full-time</p>
                                <p className="text-xs text-white/40">Jun 2021 - Nov 2024 · India</p>
                                <p className="text-xs text-white/50 mt-1">The blockchain you can bank on. Built for speed with permanently low fees, empowered by DeFi. Helped and answered questions from MELD Global community on Telegram, Discord and Reddit.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social links - top right */}
                <div className="flex gap-6 text-sm font-sans text-white/70 pointer-events-auto">
                    <a
                        href="https://x.com/defiunknownking"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-white transition-colors"
                    >
                        X
                    </a>
                    <a
                        href="https://t.me/unknownking7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-white transition-colors"
                    >
                        Telegram
                    </a>
                    <a
                        href="https://github.com/unknownking07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-white transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abhinavk7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-white transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </motion.div>

            {/* Footer - subtle */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pointer-events-auto max-w-md"
            >
                <p className="text-sm text-white/40 font-sans">
                    mod @ <a href="https://asymmetry.finance" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Asymmetry Finance</a>
                </p>
            </motion.div>
        </div>
    )
}
