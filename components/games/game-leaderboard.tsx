"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, AlertCircle, TrendingUp, TrendingDown, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface LeaderboardEntry {
  id: string
  position: number
  previousPosition?: number
  teamName: string
  score: number
  error?: string
  trend?: "up" | "down" | "same"
}

interface GameLeaderboardProps {
  gameId: string
}

export function GameLeaderboard({ gameId }: GameLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const previousEntriesRef = useRef<LeaderboardEntry[]>([])

  useEffect(() => {

   //TODO: с вебсокетами поменять
    const mockEntries: LeaderboardEntry[] = [
      { id: "1", position: 1, teamName: "Code Warriors", score: 1250 },
      { id: "2", position: 2, teamName: "Debug Masters", score: 1180 },
      { id: "3", position: 3, teamName: "Syntax Heroes", score: 1050 },
      { id: "4", position: 4, teamName: "Algorithm Aces", score: 980 },
      { id: "5", position: 5, teamName: "Binary Beasts", score: 0, error: "Compilation error" },
      { id: "6", position: 6, teamName: "Logic Lords", score: 850 },
      { id: "7", position: 7, teamName: "Function Force", score: 780 },
      { id: "8", position: 8, teamName: "Variable Vikings", score: 720 },
    ]

    const interval = setInterval(() => {
      const updatedEntries = mockEntries
        .map((entry) => {
          const previous = previousEntriesRef.current.find((p) => p.id === entry.id)
          let trend: "up" | "down" | "same" = "same";
          if (previous) {
            if (previous.position > entry.position) trend = "up";
            else if (previous.position < entry.position) trend = "down";
            else trend = "same";
          }

          return {
            ...entry,
            previousPosition: previous?.position,
            trend,
            score: entry.error ? 0 : entry.score + Math.floor(Math.random() * 50) - 25,
          }
        })
        .sort((a, b) => {
          if (a.error && !b.error) return 1
          if (!a.error && b.error) return -1
          return b.score - a.score
        })
        .map((entry, index) => ({
          ...entry,
          position: index + 1,
        }))

      previousEntriesRef.current = [...entries]
      setEntries(updatedEntries)
      setLoading(false)
    }, 3000)

    setTimeout(() => {
      setEntries(mockEntries)
      setLoading(false)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameId, entries])

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-slate-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-lg font-bold text-slate-600">{position}</div>
        )
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  if (loading) {
    return <div>Загрузка таблицы лидеров...</div>
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          Таблица лидеров
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 40, duration: 0.5 }}
                className={cn(
                  "leaderboard-row flex items-center gap-4 p-4 rounded-lg border transition-all duration-500",
                  entry.position <= 3 && !entry.error
                    ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                    : entry.error
                      ? "bg-red-50 border-red-200"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getPositionIcon(entry.position)}
                  {getTrendIcon(entry.trend)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-lg truncate">{entry.teamName}</h3>
                  {entry.previousPosition && entry.previousPosition !== entry.position && (
                    <p className="text-sm text-slate-500">Было: {entry.previousPosition} место</p>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  {entry.error ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <Badge variant="destructive" className="whitespace-nowrap">
                        Ошибка
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-slate-800">{entry.score}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
