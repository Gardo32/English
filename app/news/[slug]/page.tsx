import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function NewsItemPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: newsItem } = await supabase
    .from('news')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!newsItem) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{newsItem.title}</h1>
      <p className="text-xl text-gray-600">{newsItem.excerpt}</p>
      <div className="prose dark:prose-invert max-w-none">
        {newsItem.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

