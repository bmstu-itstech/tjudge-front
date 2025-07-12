"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Award, AlertCircle } from "lucide-react"

interface LeaderboardEntry {
  position: number
  teamName: string
  score: number
  error?: string
}

interface MiniLeaderboardProps {
  gameId: string
}

export function MiniLeaderboard({ gameId }: MiniLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const mockEntries: LeaderboardEntry[] = [
        { position: 1, teamName: "Code Warriors", score: 1250 },
        { position: 2, teamName: "Debug Masters", score: 1180 },
        { position: 3, teamName: "Syntax Heroes", score: 1050 },
        { position: 4, teamName: "Algorithm Aces", score: 980 },
        { position: 5, teamName: "Binary Beasts", score: 0, error: "Compilation error" },
        { position: 6, teamName: "Logic Lords", score: 850 },
      ]

      setTimeout(() => {
        setEntries(mockEntries)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError("Не удалось загрузить данные")
      setLoading(false)
    }
  }, [gameId])

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
      case 2:
        return <Medal className="w-4 h-4 text-slate-400 flex-shrink-0" />
      case 3:
        return <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
      default:
        return (
          <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
            {position}
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Топ команды</h4>
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-100">
              <div className="w-4 h-4 bg-slate-300 rounded flex-shrink-0"></div>
              <div className="flex-1 h-4 bg-slate-300 rounded min-w-0"></div>
              <div className="w-8 h-4 bg-slate-300 rounded flex-shrink-0"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">Топ команды</h4>
      {entries.slice(0, 3).map((entry) => (
        <div
          key={entry.position}
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            entry.error ? "bg-red-50 hover:bg-red-100 border border-red-200" : "bg-slate-50 hover:bg-slate-100"
          }`}
        >
          {getPositionIcon(entry.position)}
          <span className="flex-1 text-sm font-medium text-slate-700 truncate min-w-0">{entry.teamName}</span>
          <div className="flex-shrink-0">
            {entry.error ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <span className="text-sm font-bold text-slate-800">{entry.score}</span>
            )}
          </div>
        </div>
      ))}

      {error && (
        <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs">{error}</span>
          </div>
        </div>
      )}

      {entries.some((entry) => entry.error) && (
        <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>Есть ошибки компиляции</span>
        </div>
      )}
    </div>
  )
}
