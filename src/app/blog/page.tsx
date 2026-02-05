'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
}

export default function BlogPage() {
    return (
        <ThemeProvider>
            <BlogContent />
        </ThemeProvider>
    )
}

function BlogContent() {
    const { theme, toggleTheme } = useTheme()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const mutedText = theme === 'dark' ? 'text-white/90' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/70'

    // Load posts from API
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/blog/posts')
                if (res.ok) {
                    const data = await res.json()
                    setPosts(data)
                } else {
                    // Fallback to localStorage for local development
                    const storedPosts = localStorage.getItem('blogPosts')
                    if (storedPosts) {
                        setPosts(JSON.parse(storedPosts))
                    }
                }
            } catch {
                // Fallback to localStorage
                const storedPosts = localStorage.getItem('blogPosts')
                if (storedPosts) {
                    setPosts(JSON.parse(storedPosts))
                }
            }
            setLoading(false)
        }
        fetchPosts()
    }, [])

    return (
        <div
            className="min-h-screen w-full transition-colors duration-300"
            style={{ backgroundColor: theme === 'dark' ? '#000000' : '#faf9f7' }}
        >
            <div className={`max-w-4xl mx-auto p-6 md:p-12 ${textColor}`}>
                {/* Navigation Bar */}
                <nav className="flex items-center justify-between mb-12">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className={`text-sm font-mono ${theme === 'dark' ? 'text-white/80 group-hover:text-white' : 'text-black/80 group-hover:text-black'} transition-colors`}>
                            abhinav
                        </span>
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/blog"
                            className={`text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}
                        >
                            BLOG
                        </Link>
                        <Link
                            href="/#projects-section"
                            className={`text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'}`}
                        >
                            PROJECT
                        </Link>
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

                {/* Blog Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-4">
                        blog
                    </h1>
                    <p className={`text-lg ${mutedText}`}>
                        Thoughts on crypto, community building, and growth.
                    </p>
                </motion.div>

                {/* Blog Posts */}
                {loading ? (
                    <div className={`text-center py-12 ${subtleText}`}>
                        <div className="inline-flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Loading posts...
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500">{error}</div>
                ) : posts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className={`block p-6 rounded-xl transition-all ${theme === 'dark'
                                        ? 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                                        : 'bg-white border border-zinc-200 hover:border-zinc-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <span className={`text-xs font-mono ${subtleText}`}>
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <h2 className={`text-xl font-medium mt-1 ${textColor}`}>
                                                {post.title}
                                            </h2>
                                            <p className={`text-sm mt-2 ${subtleText} line-clamp-2`}>
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 flex-shrink-0 ${subtleText}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* No Posts - Coming Soon */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`rounded-2xl p-8 md:p-12 text-center ${theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-white border border-zinc-200'}`}
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className={`text-xs font-mono ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                                COMING SOON
                            </span>
                        </div>

                        <h2 className={`text-2xl md:text-3xl font-medium mb-4 ${textColor}`}>
                            Blog posts are brewing ☕
                        </h2>
                        <p className={`text-base ${subtleText} max-w-md mx-auto mb-8`}>
                            I'm working on sharing my experiences in crypto, community management insights, and lessons learned along the way.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {['Crypto', 'Community', 'DeFi', 'Growth', 'Web3'].map((topic) => (
                                <span
                                    key={topic}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/"
                        className={`inline-flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} transition-colors`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to home
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
