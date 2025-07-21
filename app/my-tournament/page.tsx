"use client"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, Trophy, Users, Calendar, Target } from "lucide-react"

const mockUser = {
  username: "alex_dev",
  email: "alex@example.com",
  team: {
    id: "1",
    name: "Code Warriors",
    members: [
      { id: "1", username: "alex_dev", isLeader: true },
      { id: "2", username: "maria_code", isLeader: false },
    ],
    position: 2,
    score: 1180,
  },
}

const mockContests = [
  {
    id: "1",
    name: "Весенний контест 2024",
    date: "2024-05-20",
    status: "active",
    games: [
      { id: "g1", name: "Задача A", description: "Решите задачу A", rules: "Обычные правила", isCurrent: true, submissions: 3 },
      { id: "g2", name: "Задача B", description: "Решите задачу B", rules: "Обычные правила", isCurrent: false, submissions: 1 },
    ]
  },
  {
    id: "2",
    name: "Осенний контест 2023",
    date: "2023-11-10",
    status: "finished",
    games: [
      { id: "g3", name: "Задача X", description: "Решите задачу X", rules: "Обычные правила", isCurrent: false, submissions: 2 },
    ]
  }
]

const currentContest = mockContests[0]
const currentGame = currentContest.games.find(g => g.isCurrent)

export default function MyTournamentPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [lastUpload, setLastUpload] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.name.endsWith(".py")) {
      alert("Можно загружать только .py файлы")
      return
    }
    setUploading(true)
    setTimeout(() => {
      setLastUpload(file.name)
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-6 h-6" />
          На главную
        </Link>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Текущий контест */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Текущий контест: {currentContest.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4" />
                    Дата: {new Date(currentContest.date).toLocaleDateString("ru-RU")}
                  </CardDescription>
                </div>
                <Badge variant={currentContest.status === 'active' ? 'default' : 'secondary'}>
                  {currentContest.status === 'active' ? 'Активен' : 'Завершен'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Текущая игра */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Текущая игра: {currentGame?.name}</h3>
                  </div>
                  <div className="text-slate-700">{currentGame?.description}</div>
                  <div className="text-sm text-slate-500">{currentGame?.rules}</div>
                  <div className="text-sm text-slate-600">
                    Отправок: <span className="font-semibold">{currentGame?.submissions}</span>
                  </div>
                </div>

                {/* Команда */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Ваша команда: {mockUser.team.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.team.members.map(m => (
                      <span key={m.id} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm">
                        {m.username}
                        {m.isLeader && <Badge variant="secondary" className="text-xs">Лидер</Badge>}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.team.position}</div>
                      <div className="text-sm text-slate-600">Позиция</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockUser.team.score}</div>
                      <div className="text-sm text-slate-600">Баллы</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Загрузка решения */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Загрузить решение</h3>
                <label htmlFor="file-upload" className="block w-full cursor-pointer border-2 border-dashed border-blue-200 rounded-lg p-6 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-slate-700 font-medium">Загрузить решение (только .py файл)</span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".py"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={e => { e.preventDefault(); fileInputRef.current?.click(); }}
                    disabled={uploading}
                    className="mt-3"
                  >
                    {uploading ? "Загрузка..." : "Выбрать файл"}
                  </Button>
                </label>
                {lastUpload && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-lg mt-3">
                    <FileText className="w-4 h-4" />
                    <span>Загружено: {lastUpload}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* История участия */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5" />
                История участия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockContests.map(contest => (
                  <div key={contest.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="font-semibold">{contest.name}</div>
                      <div className="text-sm text-slate-600">
                        {new Date(contest.date).toLocaleDateString("ru-RU")} • {contest.games.length} игр
                      </div>
                    </div>
                    <Badge variant={contest.status === 'active' ? 'default' : 'secondary'}>
                      {contest.status === 'active' ? 'Активен' : 'Завершен'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link href="/games/1">
                    <Trophy className="w-6 h-6" />
                    <span>Таблица лидеров</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link href="/games/1/rules">
                    <FileText className="w-6 h-6" />
                    <span>Правила игры</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link href="/profile">
                    <Users className="w-6 h-6" />
                    <span>Настройки профиля</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 