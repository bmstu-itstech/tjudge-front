"use client"

import { Suspense, useState, useRef, useEffect } from "react"
import { GameLeaderboard } from "@/components/games/game-leaderboard"
import { GameHeader } from "@/components/games/game-header"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, Trophy, Clock, Users } from "lucide-react"

interface GamePageProps {
  params: {
    id: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Мок данные игры
  const game = {
    id: params.id,
    name: "Задача A",
    tag: "judge_a",
    description: "Решите задачу A - найдите сумму всех элементов массива",
    status: "active", // active, upcoming, finished
    timeLimit: "3 часа",
    participants: 24,
    submissions: 156,
    currentUserSubmission: null, // или объект с данными о решении пользователя
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    console.log('Selected file:', file.name)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.match(/\.(py|cpp|java|js)$/)) {
        handleFileSelect(file)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-6 h-6" />
          На главную
        </Link>

        {/* Game Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{game.name}</h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="font-mono">{game.tag}</Badge>
                <Badge variant={game.status === 'active' ? 'default' : game.status === 'upcoming' ? 'secondary' : 'outline'}>
                  {game.status === 'active' ? 'Активна' : game.status === 'upcoming' ? 'Скоро' : 'Завершена'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {game.timeLimit}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {game.participants} участников
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-lg">{game.description}</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="flex w-auto mx-auto mb-6">
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Отправить решение
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Правила
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Таблица лидеров
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="mt-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Отправить решение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Язык программирования</label>
                      <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Файл с решением</label>
                      <label 
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors block ${
                          !mounted
                            ? 'border-slate-300 bg-slate-50'
                            : isDragOver 
                              ? 'border-blue-400 bg-blue-50' 
                              : selectedFile 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                        }`}
                        onDragOver={mounted ? handleDragOver : undefined}
                        onDragLeave={mounted ? handleDragLeave : undefined}
                        onDrop={mounted ? handleDrop : undefined}
                      >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className="hidden" 
                          accept=".py,.cpp,.java,.js"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileSelect(file)
                            }
                          }}
                        />
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        {selectedFile ? (
                          <div>
                            <p className="text-green-600 font-medium">Файл выбран: {selectedFile.name}</p>
                            <p className="text-xs text-slate-400 mt-1">Нажмите для выбора другого файла</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-slate-600">Перетащите файл сюда или нажмите для выбора</p>
                            <p className="text-xs text-slate-400 mt-1">Поддерживаемые форматы: .py, .cpp, .java, .js</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ваше решение</label>
                      <textarea 
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="// Введите ваш код здесь..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Отправить решение</Button>
                      <Button variant="outline">Тестировать</Button>
                    </div>
                  </div>
                </div>
                
                {game.currentUserSubmission && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Ваше последнее решение</h3>
                    <div className="text-sm text-blue-700">
                      <p>Статус: <span className="font-medium">Принято</span></p>
                      <p>Баллы: <span className="font-medium">100/100</span></p>
                      <p>Время отправки: <span className="font-medium">15:30</span></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Правила игры</h3>
                  <p className="text-slate-600 mb-4">Ознакомьтесь с полными правилами и условиями участия</p>
                  <Button asChild>
                    <Link href={`/games/${params.id}/rules`}>Открыть правила</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-2">
          <GameLeaderboard gameId={params.id} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

function GameHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-64 mb-4" />
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
