"use client"

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {AlertCircle, Clock, CalendarDays, ExternalLink, Users, Lock} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";

interface Contest {
    id: string
    name: string
    status: "upcoming" | "active" | "finished"
    type: "public" | "private"
    startTime: string
    endTime: string
    isUserParticipant?: boolean // Флаг участия пользователя
}

export function ContestsList() {
    const [contests, setContests] = useState<Contest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        try {
            const mockContests: Contest[] = [
                {
                    id: "1",
                    name: "Летний марафон программирования 2025",
                    status: "active",
                    type: "public",
                    startTime: "2025-08-11T09:00:00Z",
                    endTime: "2025-08-11T18:00:00Z",
                    isUserParticipant: true
                },
                {
                    id: "2",
                    name: "Корпоративный чемпионат IT-компаний",
                    status: "active",
                    type: "private",
                    startTime: "2025-08-11T10:00:00Z",
                    endTime: "2025-08-11T16:00:00Z",
                    isUserParticipant: true
                },

                // Предстоящие контесты
                {
                    id: "3",
                    name: "Осенний кубок алгоритмов",
                    status: "upcoming",
                    type: "public",
                    startTime: "2025-09-15T12:00:00Z",
                    endTime: "2025-09-15T17:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "4",
                    name: "Международная олимпиада по программированию",
                    status: "upcoming",
                    type: "public",
                    startTime: "2025-10-20T08:00:00Z",
                    endTime: "2025-10-20T13:00:00Z",
                    isUserParticipant: true
                },
                {
                    id: "5",
                    name: "Хакатон стартапов",
                    status: "upcoming",
                    type: "public",
                    startTime: "2025-11-05T10:00:00Z",
                    endTime: "2025-11-07T18:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "6",
                    name: "Закрытый турнир университетов",
                    status: "upcoming",
                    type: "private",
                    startTime: "2025-12-01T14:00:00Z",
                    endTime: "2025-12-01T19:00:00Z",
                    isUserParticipant: false
                },

                // Завершенные контесты
                {
                    id: "7",
                    name: "Весенний контест 2025",
                    status: "finished",
                    type: "public",
                    startTime: "2025-05-20T10:00:00Z",
                    endTime: "2025-05-20T15:00:00Z",
                    isUserParticipant: true
                },
                {
                    id: "8",
                    name: "Зимняя олимпиада по алгоритмам",
                    status: "finished",
                    type: "public",
                    startTime: "2025-02-14T11:00:00Z",
                    endTime: "2025-02-14T16:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "9",
                    name: "Новогодний турнир",
                    status: "finished",
                    type: "public",
                    startTime: "2024-12-28T13:00:00Z",
                    endTime: "2024-12-28T18:00:00Z",
                    isUserParticipant: true
                },
                {
                    id: "10",
                    name: "Осенний контест 2024",
                    status: "finished",
                    type: "private",
                    startTime: "2024-11-10T09:00:00Z",
                    endTime: "2024-11-10T17:00:00Z",
                    isUserParticipant: true
                },
                {
                    id: "11",
                    name: "Летний кубок по структурам данных",
                    status: "finished",
                    type: "public",
                    startTime: "2024-08-15T12:00:00Z",
                    endTime: "2024-08-15T18:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "12",
                    name: "Весенняя битва алгоритмов",
                    status: "finished",
                    type: "public",
                    startTime: "2024-04-22T10:00:00Z",
                    endTime: "2024-04-22T15:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "14",
                    name: "Чемпионат по динамическому программированию",
                    status: "finished",
                    type: "private",
                    startTime: "2023-12-05T11:00:00Z",
                    endTime: "2023-12-05T16:00:00Z",
                    isUserParticipant: false
                },
                {
                    id: "15",
                    name: "Турнир по графам и деревьям",
                    status: "finished",
                    type: "public",
                    startTime: "2023-09-18T13:00:00Z",
                    endTime: "2023-09-18T18:00:00Z",
                    isUserParticipant: false
                }
            ]

            setTimeout(() => {
                setContests(mockContests)
                setLoading(false)
            }, 1000)
        } catch (err) {
            setError("Не удалось загрузить список контестов")
            setLoading(false)
        }
    }, [])

    // Функция для форматирования даты и времени
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString('ru-RU'),
            time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        }
    }

    // Сортировка контестов по дате начала (от новых к старым)
    const sortedContests = [...contests].sort((a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )

    // Разделение на начатые и доступные
    const participatingContests = sortedContests.filter(contest => contest.isUserParticipant)
    const availableContests = sortedContests.filter(contest =>
        contest.type === "public" && !contest.isUserParticipant
    )

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader>
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-32 bg-slate-200 rounded mb-4"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const ContestCard = ({ contest }: { contest: Contest }) => {
        const startDateTime = formatDateTime(contest.startTime)
        const endDateTime = formatDateTime(contest.endTime)

        return (
            <Card
                key={contest.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {contest.name}
                            </CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <Badge
                                variant={contest.status === "active" ? "default" : contest.status === "upcoming" ? "secondary" : "outline"}
                                className={
                                    contest.status === "active"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : contest.status === "upcoming"
                                            ? "bg-blue-100 text-blue-800 border-blue-200"
                                            : "bg-slate-100 text-slate-800 border-slate-200"
                                }
                            >
                                {contest.status === "active" ? "Активно" : contest.status === "upcoming" ? "Скоро" : "Завершено"}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={
                                    contest.type === "public"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-orange-50 text-orange-700 border-orange-200"
                                }
                            >
                                <div className="flex items-center gap-1">
                                    {contest.type === "public" ? <Users className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                    {contest.type === "public" ? "Публичный" : "Приватный"}
                                </div>
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Начало:</span>
                            <span>{startDateTime.date}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{startDateTime.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-red-600" />
                            <span className="font-medium">Конец:</span>
                            <span>{endDateTime.date}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{endDateTime.time}</span>
                        </div>
                    </div>

                    <div className="flex pt-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/games/${contest.id}/display`} title="">
                                <ExternalLink className="w-4 h-4" />
                                Открыть
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="space-y-12">
                    {/* Начатые контесты */}
                    {participatingContests.length > 0 && (
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Начатые</h2>
                                <p className="text-lg text-slate-600">Контесты, в которых вы участвуете</p>
                            </div>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {participatingContests.map((contest) => (
                                    <ContestCard key={`participating-${contest.id}`} contest={contest} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Доступные контесты */}
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Доступные</h2>
                            <p className="text-lg text-slate-600">Публичные контесты для всех участников</p>
                        </div>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {availableContests.map((contest) => (
                                <ContestCard key={`available-${contest.id}`} contest={contest} />
                            ))}
                        </div>
                    </div>
                </div>

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
            </main>
            <Footer />
        </div>
    )
}