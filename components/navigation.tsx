"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './mode-toggle'

const students = [
  { name: 'Mohammed Aldaqaq', slug: 'mohammed-aldaqaq' },
  { name: 'Abdulla Hilal', slug: 'abdulla-hilal' },
  { name: 'Emad Nasser', slug: 'emad-nasser' },
  { name: 'Abdulla Khan', slug: 'abdulla-khan' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Grade 12 IT Students Blog
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {students.map((student) => (
              <Link
                key={student.slug}
                href={`/students/${student.slug}`}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === `/students/${student.slug}` ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {student.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

