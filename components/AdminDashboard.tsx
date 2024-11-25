'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BlogPostForm from './BlogPostForm'

type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  student_id: string
  published: boolean
  slug: string
}

type Student = {
  id: string
  name: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      router.push('/')
    } else {
      fetchPosts()
      fetchStudents()
    }
  }, [router])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data)
    }
  }

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('id, name')
    if (error) {
      console.error('Error fetching students:', error)
    } else {
      setStudents(data)
    }
  }

  const handleAddPost = () => {
    setEditingPost(null)
    setShowForm(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
      if (error) {
        console.error('Error deleting post:', error)
      } else {
        fetchPosts()
      }
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('posts')
      .update({ published: !currentStatus })
      .eq('id', id)
    if (error) {
      console.error('Error updating post:', error)
    } else {
      fetchPosts()
    }
  }

  const handleSubmitPost = async (postData: Omit<Post, 'id'>) => {
    if (editingPost) {
      const { error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', editingPost.id)
      if (error) {
        console.error('Error updating post:', error)
      } else {
        setShowForm(false)
        fetchPosts()
      }
    } else {
      const { error } = await supabase
        .from('posts')
        .insert([postData])
      if (error) {
        console.error('Error creating post:', error)
      } else {
        setShowForm(false)
        fetchPosts()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleAddPost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Post
        </button>
      </div>
      {showForm && (
        <BlogPostForm
          post={editingPost}
          students={students}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitPost}
        />
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEditPost(post)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleTogglePublish(post.id, post.published)}
                className={`${
                  post.published ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
                } text-white px-2 py-1 rounded`}
              >
                {post.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

