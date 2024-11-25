export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NCST Blog. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

