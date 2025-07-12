import { Suspense } from "react"
import { GameLeaderboard } from "@/components/games/game-leaderboard"
import { GameHeader } from "@/components/games/game-header"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface GamePageProps {
  params: {
    id: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-6 h-6" />
          На главную
        </Link>
        <Suspense fallback={<GameHeaderSkeleton />}>
          <GameHeader gameId={params.id} />
        </Suspense>

        <Suspense fallback={<LeaderboardSkeleton />}>
          <GameLeaderboard gameId={params.id} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

function GameHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-64 mb-4" />
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
