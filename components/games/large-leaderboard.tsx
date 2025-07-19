"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Award, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const mockEntries: LeaderboardEntry[] = [
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
    setEntries(mockEntries)

    const interval = setInterval(() => {
      setEntries(prev => {
        const updated = prev.map(e => ({
          ...e,
          score: e.score + Math.floor(Math.random() * 100 - 50)
        }))
        const sorted = [...updated].sort((a, b) => b.score - a.score)
        return sorted.map((e, i) => ({ ...e, position: i + 1 }))
      })
    }, 3000)
    
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

  return (
    <div className="large-display p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">Bauman Code Tournament</h1>
        <div className="text-2xl text-slate-300">{currentTime.toLocaleTimeString("ru-RU")}</div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative" style={{ height: `${entries.length * 120}px` }}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={false}
              animate={{ 
                y: (entry.position - 1) * 120,
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.8
              }}
              className={cn(
                "leaderboard-row flex items-center gap-8 p-8 rounded-2xl border-2 absolute w-full",
                entry.position <= 3
                  ? "bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/50"
                  : "bg-slate-800/50 border-slate-600/50",
                entry.error && "bg-red-900/30 border-red-500/50",
              )}
            >
              <div className="leaderboard-position">{getPositionIcon(entry.position)}</div>
              <div className="flex-1">
                <h2 className="team-name font-bold text-white mb-2 text-3xl">{entry.teamName}</h2>
                {entry.error && (
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-8 h-8" />
                    <span className="text-xl">Ошибка компиляции</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                {!entry.error && <div className="team-score text-white text-4xl font-bold">{entry.score.toLocaleString()}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
