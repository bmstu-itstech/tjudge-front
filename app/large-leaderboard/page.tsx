"use client"
import { LargeLeaderboard } from "@/components/games/large-leaderboard"

export default function LargeLeaderboardPage() {
  // TODO: получить gameId из query или выбрать активную игру
  const gameId = "1"
  return <LargeLeaderboard gameId={gameId} />
}

