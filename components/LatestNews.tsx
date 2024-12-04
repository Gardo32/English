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
  // Take only the first news item if available
  const latestNewsItem = newsItems[0];

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Latest News</h2>
      {latestNewsItem ? (
        <div className="space-y-4">
          <div key={latestNewsItem.id} className="border-b border-muted pb-2">
            <h3 className="text-sm font-semibold mb-1">
              <Link href={`/news/${latestNewsItem.slug}`} className="hover:underline">
                {latestNewsItem.title}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground">{latestNewsItem.excerpt.slice(0, 60)}...</p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No news available</p>
      )}
      <Link href="/news" className="text-sm text-primary hover:underline mt-4 inline-block">
        View all news
      </Link>
    </div>
  )
}