"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, AlertCircle, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  id: string
  position: number
  teamName: string
  score: number
  error?: string
}

interface GameLeaderboardProps {
  gameId: string
}

export function GameLeaderboard({ gameId }: GameLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previousEntriesRef = useRef<LeaderboardEntry[]>([])

  // Начальные данные
  const initialEntries: LeaderboardEntry[] = [
    { id: "1", position: 1, teamName: "Code Warriors", score: 1250 },
    { id: "2", position: 2, teamName: "Debug Masters", score: 1180 },
    { id: "3", position: 3, teamName: "Syntax Heroes", score: 1050 },
    { id: "4", position: 4, teamName: "Algorithm Aces", score: 980 },
    { id: "5", position: 5, teamName: "Binary Beasts", score: 0, error: "Compilation error" },
    { id: "6", position: 6, teamName: "Logic Lords", score: 850 },
    { id: "7", position: 7, teamName: "Function Force", score: 780 },
    { id: "8", position: 8, teamName: "Variable Vikings", score: 720 },
  ]

  useEffect(() => {
    setMounted(true)
    setEntries(initialEntries)
    previousEntriesRef.current = initialEntries
    setLoading(false)

    // Обновление каждые 10 секунд
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setEntries(prevEntries => {
        const updatedEntries = prevEntries
          .map((entry) => ({
            ...entry,
            score: entry.error ? 0 : entry.score + Math.floor(Math.random() * 30) - 15,
          }))
          .sort((a, b) => {
            if (a.error && !b.error) return 1
            if (!a.error && b.error) return -1
            return b.score - a.score
          })
          .map((entry, index) => ({
            ...entry,
            position: index + 1,
          }))

        previousEntriesRef.current = [...prevEntries]
        return updatedEntries
      })

      // Сбрасываем флаг обновления через 1 секунду
      setTimeout(() => setIsUpdating(false), 1000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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

  const getRowStyle = (entry: LeaderboardEntry) => {
    const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
    const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
    
    return {
      transform: hasPositionChanged ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: hasPositionChanged ? 10 : 1,
    }
  }

  if (loading) {
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
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-slate-50 animate-pulse">
                <div className="w-6 h-6 bg-slate-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-6 bg-slate-200 rounded mb-1"></div>
                </div>
                <div className="w-16 h-6 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  console.log('GameLeaderboard render:', { entries: entries.length, loading, mounted, gameId })

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          Таблица лидеров
          {isUpdating && (
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 relative">
          {entries.map((entry) => {
            const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
            const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
            const positionChange = previousEntry ? entry.position - previousEntry.position : 0
            
            return (
              <div
                key={entry.id}
                style={getRowStyle(entry)}
                className={cn(
                  "leaderboard-row flex items-center gap-4 p-4 rounded-lg border relative",
                  entry.position <= 3 && !entry.error
                    ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                    : entry.error
                      ? "bg-red-50 border-red-200"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100",
                  hasPositionChanged && "shadow-lg",
                  positionChange > 0 && "border-green-300 bg-green-50/50",
                  positionChange < 0 && "border-red-300 bg-red-50/50"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getPositionIcon(entry.position)}
                  {hasPositionChanged && (
                    <div className={cn(
                      "text-xs font-bold px-2 py-1 rounded-full",
                      positionChange > 0 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    )}>
                      {positionChange > 0 ? `+${positionChange}` : positionChange}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-lg truncate">{entry.teamName}</h3>
                  {hasPositionChanged && (
                    <p className="text-sm text-slate-500">
                      {positionChange > 0 ? 'Поднялся' : 'Опустился'} с {previousEntry?.position} места
                    </p>
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
                    <div className="text-2xl font-bold text-slate-800">
                      {entry.score}
                      {hasPositionChanged && (
                        <div className={cn(
                          "text-xs font-normal mt-1",
                          positionChange > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {previousEntry && entry.score > previousEntry.score ? '+' : ''}
                          {previousEntry ? entry.score - previousEntry.score : 0}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
