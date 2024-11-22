import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function StudentPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!student) {
    notFound()
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('student_id', student.id)
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{student.name}</h1>
      <p className="text-xl text-gray-600">{student.bio}</p>
      <h2 className="text-2xl font-semibold">Posts by {student.name}</h2>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.slug}`} className="hover:text-blue-500">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

