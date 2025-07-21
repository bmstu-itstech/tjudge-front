"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Users, Trophy, Calendar } from "lucide-react"
import Link from "next/link"

const mockContests = [
  { id: "1", name: "Весенний контест 2024", date: "2024-05-20" },
  { id: "2", name: "Осенний контест 2023", date: "2023-11-10" },
  { id: "3", name: "Зимний контест 2024", date: "2024-12-15" },
]

const mockTeams = [
  {
    id: "1",
    name: "Code Warriors",
    contestId: "1",
    contestName: "Весенний контест 2024",
    members: 3,
    score: 850,
    rank: 1,
    lastActivity: "2024-05-20T15:30:00Z",
  },
  {
    id: "2",
    name: "Debug Masters",
    contestId: "1",
    contestName: "Весенний контест 2024",
    members: 2,
    score: 720,
    rank: 2,
    lastActivity: "2024-05-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Syntax Heroes",
    contestId: "2",
    contestName: "Осенний контест 2023",
    members: 3,
    score: 950,
    rank: 1,
    lastActivity: "2023-11-10T16:20:00Z",
  },
  {
    id: "4",
    name: "Algorithm Avengers",
    contestId: "1",
    contestName: "Весенний контест 2024",
    members: 1,
    score: 680,
    rank: 3,
    lastActivity: "2024-05-20T13:15:00Z",
  },
]

export default function TeamsPage() {
  const [selectedContest, setSelectedContest] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeams = mockTeams.filter(team => {
    const matchesContest = selectedContest === "all" || team.contestId === selectedContest
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesContest && matchesSearch
  })

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    if (a.contestId !== b.contestId) {
      return a.contestId.localeCompare(b.contestId)
    }
    return a.rank - b.rank
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Команды</h1>
          <p className="text-slate-600">Просмотр всех команд и их результатов</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Поиск команд</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Введите название команды..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-64">
                <label className="block text-sm font-medium text-slate-700 mb-2">Фильтр по контестам</label>
                <Select value={selectedContest} onValueChange={setSelectedContest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все контесты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все контесты</SelectItem>
                    {mockContests.map(contest => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teams List */}
        <div className="space-y-4">
          {sortedTeams.map(team => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-800">{team.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          #{team.rank}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {team.contestName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {team.members} участников
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold text-slate-800">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        {team.score}
                      </div>
                      <div className="text-xs text-slate-500">
                        Последняя активность: {new Date(team.lastActivity).toLocaleDateString("ru-RU")}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/teams/${team.id}`}>Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTeams.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Команды не найдены</h3>
              <p className="text-slate-600">Попробуйте изменить параметры поиска или фильтрации</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 