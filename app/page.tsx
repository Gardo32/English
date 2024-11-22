import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Slideshow from '@/components/Slideshow'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      excerpt,
      slug,
      students (
        name,
        slug
      )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Welcome to Our Student Blog</h1>
      <p className="text-xl text-muted-foreground text-center max-w-[700px] mx-auto">
        Explore educational and entertaining content created by our Grade 12 IT students.
      </p>
      
      {posts && posts.length > 0 && (
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Latest Posts</h2>
          <Slideshow posts={posts} />
        </div>
      )}
    </div>
  )
}

