import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // Check admin auth
        const authHeader = request.headers.get('x-admin-auth')
        if (authHeader !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'File type not allowed. Supported: JPG, PNG, GIF, WebP, MP4, WebM' }, { status: 400 })
        }

        // Limit file size (50MB for videos, 10MB for images)
        const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json({ error: `File too large. Max: ${maxSize / 1024 / 1024}MB` }, { status: 400 })
        }

        // Generate unique filename
        const timestamp = Date.now()
        const extension = file.name.split('.').pop()
        const filename = `blog/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
        })

        return NextResponse.json({
            url: blob.url,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            filename: file.name,
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed. Please check Blob storage is configured.' }, { status: 500 })
    }
}
