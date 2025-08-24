"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {GameLeaderboard} from "@/components/games/game-leaderboard"

import {
    ArrowLeft,
    Trophy,
    Clock,
    Users,
    CalendarDays,
    FileText,
    UsersRound,
    Maximize,
    CheckCircle,
    Circle,
    XCircle,
} from "lucide-react"

interface ContestPageProps {
    params: {
        id: string
    }
}

interface Game {
    id: string
    name: string
    tag: string
    status: "started" | "not_started" | "error"
    points?: number
    maxPoints: number
}

export default function ContestPage({ params }: ContestPageProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const contest = {
        id: params.id,
        name: "Летний марафон программирования 2025",
        status: "active",
        type: "public",
        startTime: "2025-08-11T09:00:00Z",
        endTime: "2025-08-11T18:00:00Z",
        participants: 247,
        totalSubmissions: 1543,
        myTeam: {
            name: "CodeMasters",
            members: 3,
            rank: 1
        }
    }

    const games: Game[] = [
        {
            id: "a",
            name: "Сумма массива",
            tag: "game_a",
            status: "started",
            points: 100,
            maxPoints: 100
        },
        {
            id: "b",
            name: "Поиск в строке",
            tag: "game_b",
            status: "started",
            points: 60,
            maxPoints: 100
        },
        {
            id: "c",
            name: "Динамическое программирование",
            tag: "game_c",
            status: "error",
            maxPoints: 100
        },
        {
            id: "d",
            name: "Графы и кратчайшие пути",
            tag: "game_d",
            status: "not_started",
            maxPoints: 100
        },
    ]

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString('ru-RU'),
            time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        }
    }

    const startDateTime = formatDateTime(contest.startTime)
    const endDateTime = formatDateTime(contest.endTime)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "started":
                return <CheckCircle className="w-5 h-5 text-blue-600" />
            case "error":
                return <XCircle className="w-5 h-5 text-red-600" />
            default:
                return <Circle className="w-5 h-5 text-slate-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "started":
                return "text-blue-700 bg-blue-50 border-blue-200"
            case "error":
                return "text-red-700 bg-red-50 border-red-200"
            default:
                return "text-slate-700 bg-slate-50 border-slate-200"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "started":
                return "Приступил"
            case "error":
                return "Ошибка программы"
            default:
                return "Не приступал"
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/main"
                        className="flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                        style={{ textDecoration: 'none' }}
                    >
                        <ArrowLeft className="w-6 h-6" />
                        К списку контестов
                    </Link>

                    <Button variant="outline" className="flex items-center gap-2">
                        <Link href={`/contests/${contest.id}/leaderboard`} className="flex items-center gap-2">
                            <Maximize className="w-4 h-4" />
                            Полный экран
                        </Link>
                    </Button>
                </div>

                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-3">{contest.name}</h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge
                                    variant={contest.status === 'active' ? 'default' : contest.status === 'upcoming' ? 'secondary' : 'outline'}
                                    className={
                                        contest.status === "active"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : contest.status === "upcoming"
                                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                                : "bg-slate-100 text-slate-800 border-slate-200"
                                    }
                                >
                                    {contest.status === 'active' ? 'Активен' : contest.status === 'upcoming' ? 'Скоро' : 'Завершен'}
                                </Badge>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    <Users className="w-3 h-3 mr-1" />
                                    {contest.type === "public" ? "Публичный" : "Приватный"}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-sm">
                            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2 text-green-600 mb-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span className="font-medium">Начало:</span>
                                </div>
                                <div className="text-slate-800 font-mono">
                                    <div>{startDateTime.date}</div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {startDateTime.time}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2 text-red-600 mb-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span className="font-medium">Конец:</span>
                                </div>
                                <div className="text-slate-800 font-mono">
                                    <div>{endDateTime.date}</div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {endDateTime.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 bg-white/40 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{contest.participants} участников</span>
                        </div>
                        {contest.myTeam && (
                            <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>Команда: {contest.myTeam.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Tabs defaultValue="games" className="w-full">
                    <TabsList className="flex w-auto mx-auto mb-6">
                        <TabsTrigger value="games" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Игры
                        </TabsTrigger>
                        <TabsTrigger value="team" className="flex items-center gap-2">
                            <UsersRound className="w-4 h-4" />
                            Моя команда
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Таблица лидеров
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="games" className="mt-2">
                        <div className="grid gap-4">
                            {games.map((problem, index) => (
                                <Card key={problem.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-lg font-bold">
                                                    {String.fromCharCode(65 + index)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{problem.name}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline" className="font-mono text-xs">
                                                            {problem.tag}
                                                        </Badge>
                                                        <Badge variant="outline" className={getStatusColor(problem.status)}>
                                                            <div className="flex items-center gap-1">
                                                                {getStatusIcon(problem.status)}
                                                                {getStatusText(problem.status)}
                                                            </div>
                                                        </Badge>
                                                        {problem.points !== undefined && (
                                                            <span className="text-sm text-slate-600">
                                {problem.points}/{problem.maxPoints} баллов
                              </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <Button asChild variant="outline">
                                                <Link href={`/contests/${contest.id}/game/${problem.id}`}>
                                                    Открыть
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="team" className="mt-2">
                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <UsersRound className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Моя команда</h3>
                                    {contest.myTeam ? (
                                        <div className="space-y-3">
                                            <p className="text-slate-600 mb-4">
                                                Управляйте составом команды и отслеживайте прогресс
                                            </p>
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                                <div className="text-sm text-blue-700">
                                                    <p><span className="font-medium">Название:</span> {contest.myTeam.name}</p>
                                                    <p><span className="font-medium">Участников:</span> {contest.myTeam.members}</p>
                                                    <p><span className="font-medium">Текущее место:</span> #{contest.myTeam.rank}</p>
                                                </div>
                                            </div>
                                            <Button asChild>
                                                <Link href={`/games/${contest.id}/team`}>Управлять командой</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-slate-600 mb-4">У вас пока нет команды для этого контеста</p>
                                            <Button asChild>
                                                <Link href={`/games/${contest.id}/team/create`}>Создать команду</Link>
                                            </Button>
                                        </div>
                                    )}
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
