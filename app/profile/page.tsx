"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Upload, FileText } from "lucide-react"
import { useRef } from "react"

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
    games: [
      { id: "g1", name: "Задача A", description: "Решите задачу A", rules: "Обычные правила", isCurrent: true },
      { id: "g2", name: "Задача B", description: "Решите задачу B", rules: "Обычные правила", isCurrent: false },
    ]
  },
  {
    id: "2",
    name: "Осенний контест 2023",
    date: "2023-11-10",
    games: [
      { id: "g3", name: "Задача X", description: "Решите задачу X", rules: "Обычные правила", isCurrent: false },
    ]
  }
]

const currentContest = mockContests[0]
const currentGame = currentContest.games.find(g => g.isCurrent)

export default function ProfilePage() {
  const [password, setPassword] = useState("")
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Link
        href="/"
        className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        style={{ textDecoration: 'none' }}
      >
        <ArrowLeft className="w-6 h-6" />
        На главную
      </Link>
      <div className="w-full max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Текущий контест: {currentContest.name}</CardTitle>
            <CardDescription>Дата: {new Date(currentContest.date).toLocaleDateString("ru-RU")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="mb-2 text-lg font-semibold">Текущая игра: {currentGame?.name}</div>
                <div className="text-slate-700 mb-2">{currentGame?.description}</div>
                <div className="text-xs text-slate-500 whitespace-pre-line">{currentGame?.rules}</div>
              </div>
              <div className="flex-1">
                <div className="mb-2 text-lg font-semibold">Ваша команда: {mockUser.team.name}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {mockUser.team.members.map(m => (
                    <span key={m.id} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-sm">
                      {m.username}
                      {m.isLeader && <Badge variant="secondary" className="text-xs">Лидер</Badge>}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-slate-700">Позиция: <b>{mockUser.team.position}</b></span>
                  <span className="text-slate-700">Баллы: <b>{mockUser.team.score}</b></span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="font-semibold mb-2">Загрузить решение (.py):</div>
              <label htmlFor="file-upload" className="block w-full cursor-pointer border-2 border-dashed border-blue-200 rounded-lg p-2 min-h-[32px] text-center bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-1">
                <Upload className="w-5 h-5 text-blue-400 mb-1" />
                <span className="text-sm text-slate-700 font-medium">Загрузить решение (только .py файл)</span>
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
                  className="mt-1"
                  size="sm"
                >
                  {uploading ? "Загрузка..." : "Выбрать файл"}
                </Button>
              </label>
              {lastUpload && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg mt-2">
                  <FileText className="w-4 h-4" />
                  <span>Загружено: {lastUpload}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">История участия</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-slate-700 text-sm space-y-1">
              {mockContests.map(contest => (
                <li key={contest.id}>
                  <span className="font-semibold">{contest.name}</span> ({new Date(contest.date).toLocaleDateString("ru-RU")}) — игр: {contest.games.length}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Смена пароля</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-2 pt-2" onSubmit={e => { e.preventDefault(); alert("Пароль изменён (заглушка)") }}>
              <Label htmlFor="password">Новый пароль</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <div className="flex justify-center pt-2">
                <Button type="submit" className="w-full">Сменить пароль</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-6">
        <ThemeToggle />
      </div>
    </div>
  )
}

