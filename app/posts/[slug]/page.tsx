import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      students (
        name,
        slug
      )
    `)
    .eq('slug', params.slug)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-xl text-gray-600">
        By{' '}
        <Link href={`/students/${post.students.slug}`} className="hover:text-blue-500">
          {post.students.name}
        </Link>
      </p>
      <div className="prose dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

