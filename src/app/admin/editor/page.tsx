'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

export default function EditorPage() {
    return (
        <ThemeProvider>
            <EditorContent />
        </ThemeProvider>
    )
}

function EditorContent() {
    const { theme, toggleTheme } = useTheme()
    const router = useRouter()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const videoInputRef = useRef<HTMLInputElement>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState('')
    const [showPreview, setShowPreview] = useState(false)
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkText, setLinkText] = useState('')

    const isDark = theme === 'dark'
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const mutedText = isDark ? 'text-zinc-400' : 'text-gray-500'
    const bgColor = isDark ? '#0a0a0a' : '#ffffff'
    const cardBg = isDark ? 'bg-zinc-900/50' : 'bg-gray-50'
    const borderColor = isDark ? 'border-zinc-800' : 'border-gray-200'
    const inputBg = isDark ? 'bg-zinc-900' : 'bg-white'

    // Check authentication and load draft if continuing
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const auth = sessionStorage.getItem('adminAuth')
            if (auth !== 'true') {
                router.push('/admin')
            } else {
                setIsAuthenticated(true)

                // Check if continuing from a draft
                const draftData = sessionStorage.getItem('editDraft')
                if (draftData) {
                    try {
                        const draft = JSON.parse(draftData)
                        setTitle(draft.title || '')
                        setSlug(draft.slug || '')
                        setExcerpt(draft.excerpt || '')
                        setContent(draft.content || '')
                        setDate(draft.date || new Date().toISOString().split('T')[0])
                        // Clear the draft from sessionStorage so it doesn't load again on refresh
                        sessionStorage.removeItem('editDraft')
                    } catch (e) {
                        console.error('Error loading draft:', e)
                    }
                }
            }
        }
    }, [router])

    // Auto-generate slug from title
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
        setSlug(generatedSlug)
    }, [title])

    // Format helpers
    const insertAtCursor = (text: string) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newContent = content.substring(0, start) + text + content.substring(end)

        setContent(newContent)

        setTimeout(() => {
            textarea.focus()
            const newPos = start + text.length
            textarea.setSelectionRange(newPos, newPos)
        }, 0)
    }

    const wrapSelection = (wrapper: string) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = content.substring(start, end)

        if (selectedText) {
            const newText = content.substring(0, start) + wrapper + selectedText + wrapper + content.substring(end)
            setContent(newText)
        } else {
            insertAtCursor(wrapper + wrapper)
        }
    }

    const formatBold = () => wrapSelection('**')
    const formatItalic = () => wrapSelection('*')
    const formatCode = () => wrapSelection('`')
    const formatH2 = () => insertAtCursor('\n## ')
    const formatH3 = () => insertAtCursor('\n### ')
    const formatBullet = () => insertAtCursor('\n- ')
    const formatQuote = () => insertAtCursor('\n> ')

    const insertLink = () => {
        if (linkUrl) {
            const text = linkText || linkUrl
            insertAtCursor(`[${text}](${linkUrl})`)
            setLinkUrl('')
            setLinkText('')
            setShowLinkModal(false)
        }
    }

    // File upload handler
    const handleFileUpload = async (file: File, type: 'image' | 'video') => {
        setUploading(true)
        setUploadProgress(`Uploading ${file.name}...`)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'x-admin-auth': 'true' },
                body: formData
            })

            if (res.ok) {
                const data = await res.json()
                if (type === 'image') {
                    insertAtCursor(`\n![${file.name}](${data.url})\n`)
                } else {
                    insertAtCursor(`\n<video controls src="${data.url}"></video>\n`)
                }
                setUploadProgress('✓ Uploaded!')
            } else {
                const error = await res.json()
                setUploadProgress(`✗ ${error.error || 'Upload failed'}`)
            }
        } catch {
            setUploadProgress('✗ Upload failed')
        }

        setTimeout(() => {
            setUploading(false)
            setUploadProgress('')
        }, 2000)
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileUpload(file, 'image')
        e.target.value = ''
    }

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileUpload(file, 'video')
        e.target.value = ''
    }

    // Handle paste event for images from clipboard
    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData?.items
        if (!items) return

        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item.type.startsWith('image/')) {
                e.preventDefault()
                const file = item.getAsFile()
                if (file) {
                    // Create a proper filename for pasted images
                    const extension = item.type.split('/')[1] || 'png'
                    const pastedFile = new File([file], `pasted-image-${Date.now()}.${extension}`, { type: item.type })
                    handleFileUpload(pastedFile, 'image')
                }
                break
            }
        }
    }

    const handleSavePost = async () => {
        if (!title || !content) {
            alert('Please fill in title and content')
            return
        }

        setSaving(true)

        try {
            const res = await fetch('/api/blog/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-auth': 'true'
                },
                body: JSON.stringify({ title, slug, excerpt, content, date })
            })

            if (res.ok) {
                // Delete draft if it exists after publishing
                await fetch('/api/blog/drafts', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'x-admin-auth': 'true' },
                    body: JSON.stringify({ id: slug })
                })
                alert('✓ Post published!')
                router.push('/blog/' + slug)
            } else {
                saveToLocalStorage()
            }
        } catch {
            saveToLocalStorage()
        }

        setSaving(false)
    }

    const [savingDraft, setSavingDraft] = useState(false)

    const handleSaveDraft = async () => {
        if (!title) {
            alert('Please add a title for your draft')
            return
        }

        setSavingDraft(true)

        try {
            const res = await fetch('/api/blog/drafts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-auth': 'true'
                },
                body: JSON.stringify({ title, slug, excerpt, content, date })
            })

            if (res.ok) {
                alert('✓ Draft saved!')
            } else {
                // Fallback to localStorage
                const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]')
                const newDraft = { title, slug, excerpt, content, date, id: slug || Date.now().toString(), updatedAt: Date.now() }
                const existingIndex = drafts.findIndex((d: { id: string }) => d.id === newDraft.id)
                if (existingIndex >= 0) {
                    drafts[existingIndex] = newDraft
                } else {
                    drafts.push(newDraft)
                }
                localStorage.setItem('blogDrafts', JSON.stringify(drafts))
                alert('✓ Draft saved locally!')
            }
        } catch {
            // Fallback to localStorage
            const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]')
            const newDraft = { title, slug, excerpt, content, date, id: slug || Date.now().toString(), updatedAt: Date.now() }
            const existingIndex = drafts.findIndex((d: { id: string }) => d.id === newDraft.id)
            if (existingIndex >= 0) {
                drafts[existingIndex] = newDraft
            } else {
                drafts.push(newDraft)
            }
            localStorage.setItem('blogDrafts', JSON.stringify(drafts))
            alert('✓ Draft saved locally!')
        }

        setSavingDraft(false)
    }

    const saveToLocalStorage = () => {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
        const newPost = { title, slug, excerpt, content, date, id: Date.now().toString() }

        const existingIndex = posts.findIndex((p: { slug: string }) => p.slug === slug)
        if (existingIndex >= 0) {
            posts[existingIndex] = newPost
        } else {
            posts.push(newPost)
        }

        localStorage.setItem('blogPosts', JSON.stringify(posts))
        alert('✓ Saved locally!')
    }

    // Render preview with actual images and formatting
    const renderPreview = (text: string) => {
        return text
            // Images
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4 shadow-lg" loading="lazy" />')
            // Videos
            .replace(/<video([^>]*)src="([^"]*)"([^>]*)>/g, '<video$1src="$2"$3 class="max-w-full rounded-lg my-4" controls>')
            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
            // Text formatting
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, `<code class="${isDark ? 'bg-zinc-800' : 'bg-gray-100'} px-1.5 py-0.5 rounded text-sm font-mono">$1</code>`)
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>')
            // Lists
            .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc my-1">$1</li>')
            // Quotes
            .replace(/^> (.*$)/gm, `<blockquote class="border-l-4 ${isDark ? 'border-zinc-600 bg-zinc-800/50' : 'border-gray-300 bg-gray-50'} pl-4 py-2 italic my-4">$1</blockquote>`)
            // Paragraphs
            .replace(/\n\n/g, '</p><p class="my-4">')
            .replace(/\n/g, '<br/>')
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bgColor }}>
                <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen overflow-y-auto" style={{ backgroundColor: bgColor }}>
            {/* Hidden file inputs */}
            <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />

            {/* Header */}
            <header className={`sticky top-0 z-30 border-b ${borderColor} backdrop-blur-xl`} style={{ backgroundColor: isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)' }}>
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-colors ${mutedText}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                        <h1 className={`text-lg font-semibold ${textColor}`}>
                            {showPreview ? 'Preview' : 'Create Post'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {uploadProgress && (
                            <span className={`text-sm ${uploadProgress.includes('✓') ? 'text-green-500' : uploadProgress.includes('✗') ? 'text-red-500' : mutedText}`}>
                                {uploading && <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>}
                                {uploadProgress}
                            </span>
                        )}
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${showPreview
                                ? 'bg-purple-600 text-white'
                                : isDark ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {showPreview ? '✏️ Edit' : '👁️ Preview'}
                        </button>
                        <button
                            onClick={handleSaveDraft}
                            disabled={savingDraft || !title}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${savingDraft || !title
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : isDark ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'
                                }`}
                        >
                            {savingDraft ? 'Saving...' : '📝 Save Draft'}
                        </button>
                        <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-colors ${mutedText}`}>
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={handleSavePost}
                            disabled={saving || !title}
                            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${saving || !title
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                                }`}
                        >
                            {saving ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
                {showPreview ? (
                    /* Preview Mode - Shows how the post will look */
                    <article className={`${cardBg} rounded-2xl border ${borderColor} p-8 md:p-12`}>
                        <header className="mb-8">
                            <time className={`text-sm ${mutedText}`}>{date}</time>
                            <h1 className={`text-3xl md:text-4xl font-bold mt-2 ${textColor}`}>
                                {title || 'Untitled Post'}
                            </h1>
                            {excerpt && (
                                <p className={`text-lg mt-4 ${mutedText}`}>{excerpt}</p>
                            )}
                        </header>
                        <div
                            className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''} ${textColor}`}
                            dangerouslySetInnerHTML={{
                                __html: content
                                    ? `<p class="my-4">${renderPreview(content)}</p>`
                                    : `<p class="${mutedText}">No content yet...</p>`
                            }}
                        />
                    </article>
                ) : (
                    /* Editor Mode */
                    <div className="space-y-6">
                        {/* Title Input */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Post title..."
                            className={`w-full text-3xl md:text-4xl font-bold bg-transparent border-none outline-none ${textColor} placeholder:${mutedText}`}
                        />

                        {/* Meta Fields */}
                        <div className={`${cardBg} rounded-xl p-4 border ${borderColor}`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={`text-xs font-medium ${mutedText} uppercase tracking-wide`}>Slug</label>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className={`w-full mt-1 px-3 py-2 rounded-lg ${inputBg} border ${borderColor} ${textColor} text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500/50`}
                                    />
                                </div>
                                <div>
                                    <label className={`text-xs font-medium ${mutedText} uppercase tracking-wide`}>Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className={`w-full mt-1 px-3 py-2 rounded-lg ${inputBg} border ${borderColor} ${textColor} text-sm outline-none focus:ring-2 focus:ring-blue-500/50`}
                                    />
                                </div>
                                <div>
                                    <label className={`text-xs font-medium ${mutedText} uppercase tracking-wide`}>Excerpt</label>
                                    <input
                                        type="text"
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        placeholder="Brief description..."
                                        className={`w-full mt-1 px-3 py-2 rounded-lg ${inputBg} border ${borderColor} ${textColor} text-sm outline-none focus:ring-2 focus:ring-blue-500/50`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Editor Card */}
                        <div className={`${cardBg} rounded-xl border ${borderColor} overflow-hidden`}>
                            {/* Toolbar */}
                            <div className={`flex flex-wrap items-center gap-1 p-3 border-b ${borderColor}`}>
                                <button onClick={formatBold} className={`px-3 py-2 rounded-lg font-bold text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Bold">B</button>
                                <button onClick={formatItalic} className={`px-3 py-2 rounded-lg italic text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Italic">I</button>
                                <button onClick={formatCode} className={`px-3 py-2 rounded-lg font-mono text-xs ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Code">{`</>`}</button>
                                <div className={`w-px h-6 mx-2 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`}></div>
                                <button onClick={formatH2} className={`px-2 py-2 rounded-lg text-xs font-bold ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Heading">H2</button>
                                <button onClick={formatH3} className={`px-2 py-2 rounded-lg text-xs font-bold ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Subheading">H3</button>
                                <button onClick={formatBullet} className={`px-3 py-2 rounded-lg text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="List">•</button>
                                <button onClick={formatQuote} className={`px-3 py-2 rounded-lg text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Quote">"</button>
                                <div className={`w-px h-6 mx-2 ${isDark ? 'bg-zinc-700' : 'bg-gray-300'}`}></div>
                                <button onClick={() => setShowLinkModal(true)} className={`px-3 py-2 rounded-lg text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`} title="Link">🔗</button>
                                <button onClick={() => imageInputRef.current?.click()} disabled={uploading} className={`px-3 py-2 rounded-lg text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'} ${uploading ? 'opacity-50' : ''}`} title="Upload Image">📷</button>
                                <button onClick={() => videoInputRef.current?.click()} disabled={uploading} className={`px-3 py-2 rounded-lg text-sm ${mutedText} hover:${textColor} ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'} ${uploading ? 'opacity-50' : ''}`} title="Upload Video">🎬</button>
                            </div>

                            {/* Textarea */}
                            <textarea
                                ref={textareaRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onPaste={handlePaste}
                                placeholder="Start writing your blog post...

Tip: You can paste images directly from clipboard (Ctrl+V / Cmd+V)!

Use the toolbar above to format text:
• Bold, Italic, Code
• Headings (H2, H3)
• Lists and Quotes

Click 'Preview' to see how it will look!"
                                className={`w-full min-h-[500px] p-6 ${inputBg} ${textColor} text-base leading-relaxed resize-y outline-none`}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Link Modal */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setShowLinkModal(false)}>
                    <div className={`w-full max-w-md p-6 rounded-2xl ${isDark ? 'bg-zinc-900' : 'bg-white'} shadow-2xl`} onClick={e => e.stopPropagation()}>
                        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Insert Link</h3>
                        <input
                            type="text"
                            value={linkText}
                            onChange={(e) => setLinkText(e.target.value)}
                            placeholder="Link text"
                            className={`w-full px-4 py-3 rounded-lg mb-3 ${inputBg} border ${borderColor} ${textColor} outline-none focus:ring-2 focus:ring-blue-500/50`}
                        />
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className={`w-full px-4 py-3 rounded-lg mb-4 ${inputBg} border ${borderColor} ${textColor} outline-none focus:ring-2 focus:ring-blue-500/50`}
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowLinkModal(false)} className={`px-4 py-2 rounded-lg ${mutedText} hover:${textColor}`}>Cancel</button>
                            <button onClick={insertLink} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Insert</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
