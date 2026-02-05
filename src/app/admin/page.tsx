'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

export default function AdminPage() {
    return (
        <ThemeProvider>
            <AdminContent />
        </ThemeProvider>
    )
}

function AdminContent() {
    const { theme, toggleTheme } = useTheme()
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/70'

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                setIsAuthenticated(true)
                // Store auth in sessionStorage
                sessionStorage.setItem('adminAuth', 'true')
            } else {
                setError('Invalid password')
            }
        } catch {
            setError('Authentication failed')
        }

        setIsLoading(false)
    }

    // Check if already authenticated
    useState(() => {
        if (typeof window !== 'undefined') {
            const auth = sessionStorage.getItem('adminAuth')
            if (auth === 'true') {
                setIsAuthenticated(true)
            }
        }
    })

    if (isAuthenticated) {
        return <AdminDashboard theme={theme} toggleTheme={toggleTheme} />
    }

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: theme === 'dark' ? '#000000' : '#faf9f7' }}
        >
            <div className={`max-w-md w-full mx-4 p-8 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${theme === 'dark' ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <span className="text-xs font-mono uppercase tracking-wider">Protected Area</span>
                    </div>
                    <h1 className={`text-2xl font-medium ${textColor}`}>Admin Access</h1>
                    <p className={`text-sm ${subtleText} mt-2`}>Enter password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`w-full px-4 py-3 rounded-lg font-mono text-sm transition-all ${theme === 'dark'
                                ? 'bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500'
                                : 'bg-zinc-50 border border-zinc-200 text-black placeholder:text-zinc-400 focus:border-zinc-400'
                                } outline-none`}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg font-medium transition-all ${theme === 'dark'
                            ? 'bg-white text-black hover:bg-zinc-200'
                            : 'bg-black text-white hover:bg-zinc-800'
                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Authenticating...' : 'Enter'}
                    </button>
                </form>

                <button
                    onClick={toggleTheme}
                    className={`mt-6 mx-auto flex items-center gap-2 text-xs ${subtleText} hover:opacity-70 transition-opacity`}
                >
                    {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
                </button>
            </div>
        </div>
    )
}

function AdminDashboard({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
    const router = useRouter()
    const textColor = theme === 'dark' ? 'text-white' : 'text-black'
    const subtleText = theme === 'dark' ? 'text-white/70' : 'text-black/70'

    interface Draft {
        id: string
        title: string
        slug: string
        excerpt: string
        content: string
        date: string
        updatedAt: number
    }

    const [drafts, setDrafts] = useState<Draft[]>([])
    const [loadingDrafts, setLoadingDrafts] = useState(true)

    // Fetch drafts on mount
    useState(() => {
        const fetchDrafts = async () => {
            try {
                const res = await fetch('/api/blog/drafts')
                if (res.ok) {
                    const data = await res.json()
                    setDrafts(data)
                }
            } catch (error) {
                console.error('Error fetching drafts:', error)
            }
            setLoadingDrafts(false)
        }
        fetchDrafts()
    })

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth')
        window.location.reload()
    }

    const handleContinueDraft = (draft: Draft) => {
        // Store draft data in sessionStorage so editor can pick it up
        sessionStorage.setItem('editDraft', JSON.stringify(draft))
        router.push('/admin/editor')
    }

    const handleDeleteDraft = async (id: string) => {
        if (!confirm('Delete this draft?')) return

        try {
            await fetch('/api/blog/drafts', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'x-admin-auth': 'true' },
                body: JSON.stringify({ id })
            })
            setDrafts(drafts.filter(d => d.id !== id))
        } catch (error) {
            console.error('Error deleting draft:', error)
        }
    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div
            className="min-h-screen w-full transition-colors duration-300"
            style={{ backgroundColor: theme === 'dark' ? '#000000' : '#faf9f7' }}
        >
            <div className={`max-w-4xl mx-auto p-6 md:p-12 ${textColor}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-medium">Admin Dashboard</h1>
                        <p className={`text-sm ${subtleText} mt-1`}>Manage your blog posts</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${theme === 'dark' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid gap-4 md:grid-cols-2">
                    <button
                        onClick={() => router.push('/admin/editor')}
                        className={`p-6 rounded-xl text-left transition-all ${theme === 'dark'
                            ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
                            : 'bg-white border border-zinc-200 hover:border-zinc-300'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <h3 className="font-medium mb-1">New Post</h3>
                        <p className={`text-sm ${subtleText}`}>Write a new blog post</p>
                    </button>

                    <button
                        onClick={() => router.push('/blog')}
                        className={`p-6 rounded-xl text-left transition-all ${theme === 'dark'
                            ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
                            : 'bg-white border border-zinc-200 hover:border-zinc-300'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <h3 className="font-medium mb-1">View Blog</h3>
                        <p className={`text-sm ${subtleText}`}>See your published posts</p>
                    </button>
                </div>

                {/* Drafts Section */}
                <div className="mt-12">
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                        📝 Drafts
                        {drafts.length > 0 && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                                {drafts.length}
                            </span>
                        )}
                    </h2>

                    {loadingDrafts ? (
                        <div className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
                            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    ) : drafts.length === 0 ? (
                        <div className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
                            <p className={subtleText}>No drafts yet. Start writing and save as draft!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {drafts.map((draft) => (
                                <div
                                    key={draft.id}
                                    className={`p-4 rounded-xl flex items-center justify-between ${theme === 'dark'
                                        ? 'bg-zinc-900 border border-zinc-800'
                                        : 'bg-white border border-zinc-200'
                                        }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{draft.title || 'Untitled'}</h3>
                                        <p className={`text-sm ${subtleText}`}>
                                            Last edited: {formatDate(draft.updatedAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() => handleContinueDraft(draft)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark'
                                                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                }`}
                                        >
                                            Continue
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDraft(draft.id)}
                                            className={`p-1.5 rounded-lg transition-all ${theme === 'dark'
                                                ? 'text-red-400 hover:bg-red-500/20'
                                                : 'text-red-500 hover:bg-red-50'
                                                }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back to home */}
                <div className="mt-12 text-center">
                    <a href="/" className={`text-sm ${subtleText} hover:opacity-70 transition-opacity`}>
                        ← Back to home
                    </a>
                </div>
            </div>
        </div>
    )
}
