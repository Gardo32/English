'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogPostList({ onEditPost }) {
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    if (response.ok) {
      const data = await response.json()
      setPosts(data)
    }
  }

  const handleDeletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
        router.refresh()
      } else {
        alert('Error deleting post')
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mb-2">Author: {post.author}</p>
            <div className="flex">
              <button
                onClick={() => onEditPost(post)}
                className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

