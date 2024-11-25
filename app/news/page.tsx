import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function NewsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Latest News</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {newsItems?.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/news/${item.slug}`} className="hover:text-blue-500">
                {item.title}
              </Link>
            </h2>
            <p className="text-gray-600">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

