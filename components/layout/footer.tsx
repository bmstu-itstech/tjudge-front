import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-slate-300">
            © 2025 Разработано{" "}
            <Link
              href="https://github.com/bmstu-itstech"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ITS Tech
              <ExternalLink className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
