import { NextResponse } from 'next/server'
import { getAllDrafts, saveDraft, deleteDraft } from '@/lib/redis'

export async function GET() {
    try {
        const drafts = await getAllDrafts()
        return NextResponse.json(drafts)
    } catch (error) {
        console.error('Error fetching drafts:', error)
        return NextResponse.json({ error: 'Failed to fetch drafts' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('x-admin-auth')
        if (authHeader !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { title, slug, excerpt, content, date } = await request.json()

        const draft = await saveDraft({ title, slug, excerpt, content, date })
        return NextResponse.json(draft)
    } catch (error) {
        console.error('Error saving draft:', error)
        return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const authHeader = request.headers.get('x-admin-auth')
        if (authHeader !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await request.json()
        const success = await deleteDraft(id)

        if (success) {
            return NextResponse.json({ message: 'Draft deleted' })
        } else {
            return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
        }
    } catch (error) {
        console.error('Error deleting draft:', error)
        return NextResponse.json({ error: 'Failed to delete draft' }, { status: 500 })
    }
}
