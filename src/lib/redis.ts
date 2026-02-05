import { Redis } from '@upstash/redis'

// Initialize Redis client
// Uses Vercel's KV environment variables (auto-set when you connect Upstash via Vercel)
const redis = new Redis({
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    createdAt: number
}

const BLOG_POSTS_KEY = 'blog:posts'

export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        const posts = await redis.get<BlogPost[]>(BLOG_POSTS_KEY)
        return posts || []
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts()
    return posts.find(post => post.slug === slug) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt'>): Promise<BlogPost> {
    const posts = await getAllPosts()

    const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: Date.now(),
    }

    // Check if slug already exists
    const existingIndex = posts.findIndex(p => p.slug === post.slug)
    if (existingIndex >= 0) {
        posts[existingIndex] = newPost
    } else {
        posts.push(newPost)
    }

    // Sort by date, newest first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    await redis.set(BLOG_POSTS_KEY, posts)
    return newPost
}

export async function deletePost(slug: string): Promise<boolean> {
    const posts = await getAllPosts()
    const filteredPosts = posts.filter(p => p.slug !== slug)

    if (filteredPosts.length === posts.length) {
        return false // Post not found
    }

    await redis.set(BLOG_POSTS_KEY, filteredPosts)
    return true
}

// Draft management
export interface Draft {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    updatedAt: number
}

const DRAFTS_KEY = 'blog:drafts'

export async function getAllDrafts(): Promise<Draft[]> {
    try {
        const drafts = await redis.get<Draft[]>(DRAFTS_KEY)
        return drafts || []
    } catch (error) {
        console.error('Error fetching drafts:', error)
        return []
    }
}

export async function saveDraft(draft: Omit<Draft, 'id' | 'updatedAt'>): Promise<Draft> {
    const drafts = await getAllDrafts()

    const newDraft: Draft = {
        ...draft,
        id: draft.slug || Date.now().toString(),
        updatedAt: Date.now(),
    }

    // Update if exists, otherwise add new
    const existingIndex = drafts.findIndex(d => d.id === newDraft.id)
    if (existingIndex >= 0) {
        drafts[existingIndex] = newDraft
    } else {
        drafts.push(newDraft)
    }

    // Sort by updatedAt, newest first
    drafts.sort((a, b) => b.updatedAt - a.updatedAt)

    await redis.set(DRAFTS_KEY, drafts)
    return newDraft
}

export async function getDraft(id: string): Promise<Draft | null> {
    const drafts = await getAllDrafts()
    return drafts.find(d => d.id === id) || null
}

export async function deleteDraft(id: string): Promise<boolean> {
    const drafts = await getAllDrafts()
    const filteredDrafts = drafts.filter(d => d.id !== id)

    if (filteredDrafts.length === drafts.length) {
        return false
    }

    await redis.set(DRAFTS_KEY, filteredDrafts)
    return true
}

export { redis }

