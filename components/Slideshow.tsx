'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  excerpt: string
  slug: string
  students: {
    name: string
    slug: string
  }
}

interface SlideshowProps {
  posts: Post[]
}

export default function Slideshow({ posts }: SlideshowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      let scrollPosition = 0
      const scroll = () => {
        scrollPosition += 1
        if (scrollPosition >= scrollElement.scrollWidth / 2) {
          scrollPosition = 0
        }
        scrollElement.scrollLeft = scrollPosition
      }
      const intervalId = setInterval(scroll, 30)
      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{ width: '200%' }}
      >
        {[...posts, ...posts].map((post, index) => (
          <div key={`${post.id}-${index}`} className="w-1/2 flex-shrink-0 px-4">
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <p className="text-sm">
                By{' '}
                <Link href={`/students/${post.students.slug}`} className="text-primary hover:underline">
                  {post.students.name}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

