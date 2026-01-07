import { motion } from 'framer-motion'

export default function Overlay() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none text-white z-10 selection:bg-blue-500 selection:text-white">

            {/* Header - minimal like dakshie */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col md:flex-row justify-between items-start pointer-events-auto gap-8 md:gap-0"
            >
                {/* Hero text - left side */}
                <div className="max-w-2xl">
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
                </div>

                {/* Social links - top right */}
                <div className="flex gap-6 text-sm font-sans text-white/70">
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
