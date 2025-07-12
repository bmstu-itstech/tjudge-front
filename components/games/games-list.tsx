"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, ExternalLink, AlertCircle } from "lucide-react"
import { MiniLeaderboard } from "./mini-leaderboard"

interface Game {
  id: string
  name: string
  tag: string
  description: string
  status: "upcoming" | "active" | "finished"
  startTime?: string
  endTime?: string
  participantCount: number
}

export function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const mockGames: Game[] = [
        {
          id: "1",
          name: "Алгоритмы и структуры данных",
          tag: "algorithms",
          description: "Соревнование по решению алгоритмических задач",
          status: "active",
          participantCount: 24,
        },
        {
          id: "2",
          name: "Машинное обучение",
          tag: "ml",
          description: "Задачи по машинному обучению и анализу данных",
          status: "upcoming",
          startTime: "2025-01-15T10:00:00Z",
          participantCount: 18,
        },
        {
          id: "3",
          name: "Web разработка",
          tag: "web",
          description: "Создание веб-приложений на современных технологиях",
          status: "finished",
          participantCount: 32,
        },
      ]

      setTimeout(() => {
        setGames(mockGames)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError("Не удалось загрузить список игр")
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-200 rounded mb-4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {games.map((game) => (
          <Card
            key={game.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {game.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-slate-600">{game.description}</CardDescription>
                </div>
                <Badge
                  variant={game.status === "active" ? "default" : game.status === "upcoming" ? "secondary" : "outline"}
                  className={
                    game.status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : game.status === "upcoming"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-slate-100 text-slate-800 border-slate-200"
                  }
                >
                  {game.status === "active" ? "Активно" : game.status === "upcoming" ? "Скоро" : "Завершено"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{game.participantCount} участников</span>
                </div>
                {game.startTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(game.startTime).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {game.status === "active" && <MiniLeaderboard gameId={game.id} />}

              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <Link href={`/games/${game.id}`} className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Таблица лидеров
                  </Link>
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <Link href={`/games/${game.id}/display`} title="Полноэкранный режим">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Error display at the bottom */}
      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">Ошибка загрузки</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
