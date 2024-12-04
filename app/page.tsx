import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Slideshow from '@/components/Slideshow'
import LatestNews from '@/components/LatestNews'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const [{ data: posts }, { data: newsItems }] = await Promise.all([
    supabase
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
      .limit(5),
    supabase
      .from('news')
      .select('id, title, excerpt, slug')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-screen">
      <div className="md:col-span-2 space-y-4"> 
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome To NCST Blog</h1>
        <p className="text-xl text-muted-foreground">
        Discover a wealth of educational and entertaining content crafted by NCST Grade 12 CCP students for their ENG301 website project.
        </p>
      </div>

      <div className="md:col-span-1">
        {newsItems && newsItems.length > 0 && (
          <LatestNews newsItems={newsItems} />
        )}
      </div>

      {posts && posts.length > 0 && (
        <div className="slideshow-container md:col-span-3 mt-0">
          <h2 className="text-2xl font-semibold mb-2">Latest Posts</h2>
          <div className="slideshow">
            <Slideshow posts={posts} />
          </div>
        </div>
      )}
    </div>
  )
}