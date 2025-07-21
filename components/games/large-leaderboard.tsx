"use client"

import { useState, useEffect, useRef } from "react"
import { Trophy, Medal, Award, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  id: string
  position: number
  teamName: string
  score: number
  error?: string
}

interface LargeLeaderboardProps {
  gameId: string
}

export function LargeLeaderboard({ gameId }: LargeLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previousEntriesRef = useRef<LeaderboardEntry[]>([])

  // Начальные данные
  const initialEntries: LeaderboardEntry[] = [
      { id: "1", position: 1, teamName: "Code Warriors", score: 1250 },
      { id: "2", position: 2, teamName: "Debug Masters", score: 1180 },
      { id: "3", position: 3, teamName: "Syntax Heroes", score: 1050 },
      { id: "4", position: 4, teamName: "Algorithm Aces", score: 980 },
      { id: "5", position: 5, teamName: "Binary Beasts", score: 920 },
      { id: "6", position: 6, teamName: "Logic Lords", score: 850 },
      { id: "7", position: 7, teamName: "Function Force", score: 780 },
      { id: "8", position: 8, teamName: "Variable Vikings", score: 720 },
    { id: "9", position: 9, teamName: "Data Dragons", score: 650 },
    { id: "10", position: 10, teamName: "Stack Stars", score: 580 },
    { id: "11", position: 11, teamName: "Queue Queens", score: 520 },
    { id: "12", position: 12, teamName: "Tree Titans", score: 460 },
  ]

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    setEntries(initialEntries)
    previousEntriesRef.current = initialEntries
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setEntries(prev => {
        const updated = prev.map(e => ({
          ...e,
          score: e.score + Math.floor(Math.random() * 50 - 25)
        }))
        const sorted = [...updated].sort((a, b) => b.score - a.score)
        const result = sorted.map((e, i) => ({ ...e, position: i + 1 }))
        
        previousEntriesRef.current = [...prev]
        return result
      })

      setTimeout(() => setIsUpdating(false), 1000)
    }, 15000) // Обновление каждые 15 секунд
    
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => { clearInterval(interval); clearInterval(timeInterval) }
  }, [gameId])

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-16 h-16 text-yellow-400" />
      case 2:
        return <Medal className="w-16 h-16 text-slate-300" />
      case 3:
        return <Award className="w-16 h-16 text-amber-500" />
      default:
        return (
          <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold text-slate-400 bg-slate-700 rounded-full">
            {position}
          </div>
        )
    }
  }

  const getRowStyle = (entry: LeaderboardEntry) => {
    const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
    const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
    
    return {
      transform: hasPositionChanged ? 'scale(1.01)' : 'scale(1)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: hasPositionChanged ? 10 : 1,
    }
  }

  if (!mounted || entries.length === 0) {
    return (
      <div className="large-display p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Bauman Code Tournament</h1>
          <div className="text-2xl text-slate-300">Загрузка таблицы лидеров...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="large-display p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">Bauman Code Tournament</h1>
        <div className="text-2xl text-slate-300 flex items-center justify-center gap-4">
          {currentTime?.toLocaleTimeString("ru-RU") || "--:--:--"}
          {isUpdating && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="space-y-4">
          {entries.map((entry) => {
            const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
            const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
            const positionChange = previousEntry ? entry.position - previousEntry.position : 0
            
            return (
            <div
              key={entry.id}
                style={getRowStyle(entry)}
              className={cn(
                  "leaderboard-row flex items-center gap-8 p-8 rounded-2xl border-2 relative",
                entry.position <= 3
                  ? "bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/50"
                  : "bg-slate-800/50 border-slate-600/50",
                entry.error && "bg-red-900/30 border-red-500/50",
                  hasPositionChanged && "shadow-2xl",
                  positionChange > 0 && "border-green-400/50 bg-green-900/20",
                  positionChange < 0 && "border-red-400/50 bg-red-900/20"
                )}
            >
                <div className="leaderboard-position relative">
                  {getPositionIcon(entry.position)}
                  {hasPositionChanged && (
                    <div className={cn(
                      "absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full",
                      positionChange > 0 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    )}>
                      {positionChange > 0 ? `+${positionChange}` : positionChange}
                    </div>
                  )}
                </div>

              <div className="flex-1">
                  <h2 className="team-name font-bold text-white mb-2 text-3xl">{entry.teamName}</h2>
                  {hasPositionChanged && (
                    <p className="text-slate-300 text-lg">
                      {positionChange > 0 ? '↑ Поднялся' : '↓ Опустился'} с {previousEntry?.position} места
                    </p>
                  )}
                {entry.error && (
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-8 h-8" />
                    <span className="text-xl">Ошибка компиляции</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                  {!entry.error && (
                    <div className="team-score text-white text-4xl font-bold">
                      {entry.score.toLocaleString()}
                      {hasPositionChanged && (
                        <div className={cn(
                          "text-lg font-normal mt-2",
                          positionChange > 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {previousEntry && entry.score > previousEntry.score ? '+' : ''}
                          {previousEntry ? (entry.score - previousEntry.score).toLocaleString() : 0}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
