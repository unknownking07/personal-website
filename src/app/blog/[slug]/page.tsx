'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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

export default function BlogPostPage() {
    return (
        <ThemeProvider>
            <BlogPostContent />
        </ThemeProvider>
    )
}

function BlogPostContent() {
    const { theme, toggleTheme } = useTheme()
    const params = useParams()
    const slug = params.slug as string

    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/70'

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('/api/blog/posts')
                if (res.ok) {
                    const posts = await res.json()
                    const foundPost = posts.find((p: BlogPost) => p.slug === slug)
                    setPost(foundPost || null)
                } else {
                    // Fallback to localStorage
                    const storedPosts = localStorage.getItem('blogPosts')
                    if (storedPosts) {
                        const posts = JSON.parse(storedPosts)
                        const foundPost = posts.find((p: BlogPost) => p.slug === slug)
                        setPost(foundPost || null)
                    }
                }
            } catch {
                // Fallback to localStorage
                const storedPosts = localStorage.getItem('blogPosts')
                if (storedPosts) {
                    const posts = JSON.parse(storedPosts)
                    const foundPost = posts.find((p: BlogPost) => p.slug === slug)
                    setPost(foundPost || null)
                }
            }
            setLoading(false)
        }
        fetchPost()
    }, [slug])

    // Simple markdown to HTML converter
    const renderContent = (content: string) => {
        let html = content
            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
            // Bold and italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-zinc-800 text-zinc-300 p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
            // Unordered lists
            .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
            // Paragraphs
            .replace(/\n\n/g, '</p><p class="mb-4">')
            // Line breaks
            .replace(/\n/g, '<br/>')

        // Wrap lists
        html = html.replace(/(<li[^>]*>.*?<\/li>)/g, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>')

        return `<p class="mb-4">${html}</p>`
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#000' : '#faf9f7' }}>
                <div className={`inline-flex items-center gap-2 ${textColor}`}>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div
                className="min-h-screen w-full transition-colors duration-300"
                style={{ backgroundColor: theme === 'dark' ? '#000000' : '#faf9f7' }}
            >
                <div className={`max-w-4xl mx-auto p-6 md:p-12 text-center ${textColor}`}>
                    <h1 className="text-3xl font-medium mb-4">Post not found</h1>
                    <p className={`${subtleText} mb-8`}>The blog post you're looking for doesn't exist.</p>
                    <Link href="/blog" className="text-blue-500 hover:underline">
                        ← Back to blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen w-full transition-colors duration-300"
            style={{ backgroundColor: theme === 'dark' ? '#000000' : '#faf9f7' }}
        >
            <div className={`max-w-3xl mx-auto p-6 md:p-12 ${textColor}`}>
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
                            className={`text-[11px] uppercase tracking-[0.24em] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'}`}
                        >
                            BLOG
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

                {/* Back to blog */}
                <Link
                    href="/blog"
                    className={`inline-flex items-center gap-2 text-sm mb-8 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} transition-colors`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to blog
                </Link>

                {/* Post Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <time className={`text-sm font-mono ${subtleText}`}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                    <h1 className="text-3xl md:text-4xl font-medium mt-2 leading-tight">
                        {post.title}
                    </h1>
                    <p className={`text-lg ${subtleText} mt-4`}>
                        {post.excerpt}
                    </p>
                </motion.header>

                {/* Divider */}
                <div className={`border-t mb-8 ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}></div>

                {/* Post Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}
                    dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                />

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`mt-16 pt-8 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}
                >
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className={`inline-flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} transition-colors`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            More posts
                        </Link>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} transition-colors`}
                        >
                            Share on X
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </motion.footer>
            </div>
        </div>
    )
}
