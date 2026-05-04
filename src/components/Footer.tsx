import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20 py-10 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <span>✂️</span> CancelHub
        </div>
        <p className="text-center">Free cancellation guides for every subscription. Steps verified by real humans.</p>
        <div className="flex gap-4">
          <Link href="/cancel" className="hover:text-gray-900 transition-colors">All Guides</Link>
          <span className="text-gray-300">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
