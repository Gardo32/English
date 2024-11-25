import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  slug: string
}

interface LatestNewsProps {
  newsItems: NewsItem[]
}

export default function LatestNews({ newsItems }: LatestNewsProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Latest News</h2>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="border-b border-muted pb-2 last:border-b-0 last:pb-0">
            <h3 className="text-sm font-semibold mb-1">
              <Link href={`/news/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground">{item.excerpt.slice(0, 60)}...</p>
          </div>
        ))}
      </div>
      <Link href="/news" className="text-sm text-primary hover:underline mt-4 inline-block">
        View all news
      </Link>
    </div>
  )
}

