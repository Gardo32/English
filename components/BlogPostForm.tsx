'use client'

import { useState, useEffect } from 'react'

type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  student_id: string
  slug: string
  published: boolean
}

type Student = {
  id: string
  name: string
}

type BlogPostFormProps = {
  post: Post | null
  students: Student[]
  onClose: () => void
  onSubmit: (postData: Omit<Post, 'id'>) => void
}

export default function BlogPostForm({ post, students, onClose, onSubmit }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [studentId, setStudentId] = useState(post?.student_id || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [published, setPublished] = useState(post?.published || false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setExcerpt(post.excerpt)
      setStudentId(post.student_id)
      setSlug(post.slug)
      setPublished(post.published)
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      content,
      excerpt,
      student_id: studentId,
      slug,
      published
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      <div>
        <label htmlFor="student" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student</label>
        <select
          id="student"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Published</span>
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {post ? 'Update' : 'Create'} Post
        </button>
      </div>
    </form>
  )
}

