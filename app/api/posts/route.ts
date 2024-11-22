import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401 }
    )
  }

  const { title, content, author } = await request.json()

  const post = await prisma.post.create({
    data: { title, content, author },
  })

  return NextResponse.json(post)
}

