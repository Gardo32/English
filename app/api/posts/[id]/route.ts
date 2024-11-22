import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401 }
    )
  }

  const { title, content, author } = await request.json()

  const post = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: { title, content, author },
  })

  return NextResponse.json(post)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401 }
    )
  }

  await prisma.post.delete({
    where: { id: parseInt(params.id) },
  })

  return new NextResponse(null, { status: 204 })
}

