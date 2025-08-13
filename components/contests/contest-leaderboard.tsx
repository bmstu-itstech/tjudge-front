"use client"

import { useState, useEffect, useRef } from "react"
import { Trophy, Medal, Award, AlertCircle } from "lucide-react"

interface LeaderboardEntry {
  id: string
  position: number
  teamName: string
  score: number
  error?: string
}

interface FullscreenLeaderboardProps {
  contestId: string
}

export function FullscreenLeaderboard({ contestId }: FullscreenLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previousEntriesRef = useRef<LeaderboardEntry[]>([])

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
    { id: "13", position: 13, teamName: "Hash Heroes", score: 420 },
    { id: "14", position: 14, teamName: "Loop Legends", score: 380 },
    { id: "15", position: 15, teamName: "Array Avengers", score: 350 },
    { id: "16", position: 16, teamName: "Object Oracles", score: 320 },
    { id: "17", position: 17, teamName: "Method Mages", score: 290 },
    { id: "18", position: 18, teamName: "Class Champions", score: 260 },
    { id: "19", position: 19, teamName: "String Sorcerers", score: 240 },
    { id: "20", position: 20, teamName: "Number Ninjas", score: 220 },
    { id: "21", position: 21, teamName: "Boolean Bandits", score: 200 },
    { id: "22", position: 22, teamName: "Null Navigators", score: 180 },
    { id: "23", position: 23, teamName: "Void Voyagers", score: 160 },
    { id: "24", position: 24, teamName: "Byte Builders", score: 140 },
    { id: "25", position: 25, teamName: "Bit Blazers", score: 120 },
    { id: "26", position: 26, teamName: "CPU Crusaders", score: 100 },
    { id: "27", position: 27, teamName: "RAM Raiders", score: 80 },
    { id: "28", position: 28, teamName: "SSD Soldiers", score: 60 },
    { id: "29", position: 29, teamName: "GPU Guardians", score: 40 },
    { id: "30", position: 30, teamName: "API Architects", score: 20 },
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
          score: Math.max(0, e.score + Math.floor(Math.random() * 50 - 25))
        }))
        const sorted = [...updated].sort((a, b) => b.score - a.score)
        const result = sorted.map((e, i) => ({ ...e, position: i + 1 }))

        previousEntriesRef.current = [...prev]
        return result
      })

      setTimeout(() => setIsUpdating(false), 1000)
    }, 15000)

    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => { clearInterval(interval); clearInterval(timeInterval) }
  }, [contestId])

  const getPositionIcon = (position: number) => {
    const iconSize = "w-8 h-8 md:w-10 md:h-10"
    const numberSize = "w-8 h-8 md:w-10 md:h-10 text-sm md:text-base"

    switch (position) {
      case 1:
        return <Trophy className={`${iconSize} text-yellow-400`} />
      case 2:
        return <Medal className={`${iconSize} text-slate-300`} />
      case 3:
        return <Award className={`${iconSize} text-amber-500`} />
      default:
        return (
          <div className={`${numberSize} flex items-center justify-center font-bold text-slate-400 bg-slate-700 rounded-full`}>
            {position}
          </div>
        )
    }
  }

  const getRowStyle = (entry: LeaderboardEntry) => {
    const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
    const hasPositionChanged = previousEntry && previousEntry.position !== entry.position

    return {
      transform: hasPositionChanged ? 'scale(1.005)' : 'scale(1)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: hasPositionChanged ? 10 : 1,
    }
  }

  const getRowClasses = (entry: LeaderboardEntry) => {
    const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
    const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
    const positionChange = previousEntry ? entry.position - previousEntry.position : 0

    let baseClasses = "flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg border relative"

    if (entry.position <= 3) {
      baseClasses += " bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/50"
    } else {
      baseClasses += " bg-slate-800/50 border-slate-600/50"
    }

    if (entry.error) {
      baseClasses += " bg-red-900/30 border-red-500/50"
    }

    if (hasPositionChanged) {
      baseClasses += " shadow-lg"
    }

    if (positionChange > 0) {
      baseClasses += " border-green-400/50 bg-green-900/20"
    } else if (positionChange < 0) {
      baseClasses += " border-red-400/50 bg-red-900/20"
    }

    return baseClasses
  }

  if (!mounted || entries.length === 0) {
    return (
      <div className="fixed inset-0 p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">Bauman Code Tournament</h1>
          <div className="text-lg md:text-2xl text-slate-300">Загрузка таблицы лидеров...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 p-2 md:p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Заголовок */}
      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2">Bauman Code Tournament</h1>
        <div className="text-sm md:text-xl lg:text-2xl text-slate-300 flex items-center justify-center gap-2 md:gap-4">
          {currentTime?.toLocaleTimeString("ru-RU") || "--:--:--"}
          {isUpdating && (
            <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Таблица лидеров */}
      <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] overflow-hidden">
        <div className="h-full">
          {/* Сетка для команд */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-2 auto-rows-fr">
            {entries.map((entry) => {
              const previousEntry = previousEntriesRef.current.find(p => p.id === entry.id)
              const hasPositionChanged = previousEntry && previousEntry.position !== entry.position
              const positionChange = previousEntry ? entry.position - previousEntry.position : 0

              return (
                <div
                  key={entry.id}
                  style={getRowStyle(entry)}
                  className={getRowClasses(entry)}
                >
                  {/* Позиция */}
                  <div className="relative flex-shrink-0">
                    {getPositionIcon(entry.position)}
                    {hasPositionChanged && (
                      <div className={`absolute -top-1 -right-1 text-xs font-bold px-1 py-0.5 rounded-full text-white ${
                        positionChange > 0 ? "bg-green-500" : "bg-red-500"
                      }`}>
                        {positionChange > 0 ? `+${positionChange}` : positionChange}
                      </div>
                    )}
                  </div>

                  {/* Информация о команде */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-white mb-1 text-sm md:text-base lg:text-lg truncate">
                      {entry.teamName}
                    </h2>
                    {hasPositionChanged && (
                      <p className="text-slate-300 text-xs md:text-sm">
                        {positionChange > 0 ? '↑' : '↓'} с {previousEntry?.position} места
                      </p>
                    )}
                    {entry.error && (
                      <div className="flex items-center gap-1 text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">Ошибка</span>
                      </div>
                    )}
                  </div>

                  {/* Счет */}
                  <div className="text-right flex-shrink-0">
                    {!entry.error && (
                      <div className="text-white text-sm md:text-base lg:text-xl font-bold">
                        {entry.score.toLocaleString()}
                        {hasPositionChanged && previousEntry && (
                          <div className={`text-xs md:text-sm font-normal mt-1 ${
                            entry.score > previousEntry.score ? "text-green-400" : "text-red-400"
                          }`}>
                            {entry.score > previousEntry.score ? '+' : ''}
                            {(entry.score - previousEntry.score).toLocaleString()}
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
    </div>
  )
}
