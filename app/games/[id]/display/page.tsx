import { LargeLeaderboard } from "@/components/games/large-leaderboard"

interface DisplayPageProps {
  params: {
    id: string
  }
}

export default function DisplayPage({ params }: DisplayPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <LargeLeaderboard gameId={params.id} />
    </div>
  )
}
