"use client"
import { LargeLeaderboard } from "@/components/games/large-leaderboard"

export default function LargeLeaderboardPage() {
  // TODO: получить gameId из query или выбрать активную игру
  const gameId = "1"
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <LargeLeaderboard gameId={gameId} />
    </div>
  )
}

