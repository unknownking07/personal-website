import { NextResponse } from 'next/server'
import { getAllPosts, createPost, deletePost } from '@/lib/redis'

// GET all posts
export async function GET() {
    try {
        const posts = await getAllPosts()
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}

// POST create new post
export async function POST(request: Request) {
    try {
        // Verify admin auth from session (check header)
        const authHeader = request.headers.get('x-admin-auth')
        if (authHeader !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, slug, excerpt, content, date } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const post = await createPost({
            title,
            slug,
            excerpt: excerpt || '',
            content,
            date: date || new Date().toISOString().split('T')[0],
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}

// DELETE post by slug
export async function DELETE(request: Request) {
    try {
        const authHeader = request.headers.get('x-admin-auth')
        if (authHeader !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const slug = searchParams.get('slug')

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
        }

        const deleted = await deletePost(slug)
        if (!deleted) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting post:', error)
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
}
