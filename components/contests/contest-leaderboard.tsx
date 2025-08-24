"use client"

import { useState, useEffect } from "react"
import { GameLeaderboard } from "@/components/games/game-leaderboard"

interface GameResult {
    gameId: string
    gameName: string
    points: number
    rank: number
    hasError: boolean
}

interface TeamLeaderboard {
    teamId: string
    teamName: string
    totalPoints: number
    overallRank: number
    gameResults: GameResult[]
}

interface Game {
    id: string
    name: string
    maxPoints: number
}

interface FullscreenLeaderboardProps {
    contestId: string
}

export function FullscreenLeaderboard({ contestId }: FullscreenLeaderboardProps) {
    const [currentTime, setCurrentTime] = useState<Date | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [mounted, setMounted] = useState(false)

    const mockGames: Game[] = [
        { id: 'a', name: 'Сумма массива', maxPoints: 100 },
        { id: 'b', name: 'Поиск в строке', maxPoints: 100 },
        { id: 'c', name: 'Динамическое программирование', maxPoints: 200 },
        { id: 'd', name: 'Графы и кратчайшие пути', maxPoints: 300 }
    ]

    const mockData: TeamLeaderboard[] = [
        {
            teamId: '1',
            teamName: 'CodeMasters',
            totalPoints: 340,
            overallRank: 1,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 100, rank: 1, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 85, rank: 3, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 95, rank: 2, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 60, rank: 8, hasError: false }
            ]
        },
        {
            teamId: '2',
            teamName: 'AlgoWarriors',
            totalPoints: 320,
            overallRank: 2,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 90, rank: 2, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 100, rank: 1, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 80, rank: 4, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 50, rank: 12, hasError: false }
            ]
        },
        {
            teamId: '3',
            teamName: 'BinaryBeasts',
            totalPoints: 315,
            overallRank: 3,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 85, rank: 4, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 90, rank: 2, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 100, rank: 1, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 40, rank: 15, hasError: false }
            ]
        },
        {
            teamId: '4',
            teamName: 'DataDragons',
            totalPoints: 295,
            overallRank: 4,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 95, rank: 3, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 75, rank: 5, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 85, rank: 3, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 40, rank: 15, hasError: false }
            ]
        },
        {
            teamId: '5',
            teamName: 'LogicLords',
            totalPoints: 280,
            overallRank: 5,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 80, rank: 6, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 80, rank: 4, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 70, rank: 6, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 50, rank: 12, hasError: false }
            ]
        },
        {
            teamId: '6',
            teamName: 'SyntaxHeroes',
            totalPoints: 270,
            overallRank: 6,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 75, rank: 8, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 70, rank: 7, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 75, rank: 5, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 50, rank: 12, hasError: false }
            ]
        },
        {
            teamId: '7',
            teamName: 'FunctionForce',
            totalPoints: 255,
            overallRank: 7,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 70, rank: 10, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 65, rank: 8, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 60, rank: 8, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 60, rank: 8, hasError: false }
            ]
        },
        {
            teamId: '8',
            teamName: 'VariableVikings',
            totalPoints: 240,
            overallRank: 8,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 60, rank: 12, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 60, rank: 10, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 55, rank: 9, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 65, rank: 6, hasError: false }
            ]
        },
        {
            teamId: '9',
            teamName: 'ArrayAvengers',
            totalPoints: 225,
            overallRank: 9,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 55, rank: 14, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 55, rank: 12, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 50, rank: 10, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 65, rank: 6, hasError: false }
            ]
        },
        {
            teamId: '10',
            teamName: 'StackStars',
            totalPoints: 210,
            overallRank: 10,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 50, rank: 16, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 50, rank: 14, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 45, rank: 12, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 65, rank: 6, hasError: false }
            ]
        },
        {
            teamId: '11',
            teamName: 'QueueQueens',
            totalPoints: 195,
            overallRank: 11,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 45, rank: 18, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 45, rank: 16, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 40, rank: 14, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 65, rank: 6, hasError: false }
            ]
        },
        {
            teamId: '12',
            teamName: 'TreeTitans',
            totalPoints: 180,
            overallRank: 12,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 40, rank: 20, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 40, rank: 18, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 35, rank: 16, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 65, rank: 6, hasError: false }
            ]
        }
    ]

    useEffect(() => {
        setMounted(true)
        setCurrentTime(new Date())
    }, [])

    useEffect(() => {
        if (!mounted) return

        const interval = setInterval(() => {
            setIsUpdating(true)
            setTimeout(() => setIsUpdating(false), 1000)
        }, 30000) // Обновление каждые 30 секунд

        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => {
            clearInterval(interval)
            clearInterval(timeInterval)
        }
    }, [mounted])

    if (!mounted) {
        return (
            <div className="fixed inset-0 bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Bauman Code Tournament</h1>
                    <div className="text-xl text-slate-300">Загрузка таблицы лидеров...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-slate-900 text-white overflow-hidden flex flex-col">
            {/* Заголовок */}
            <div className="text-center py-4 border-b border-slate-700">
                <h1 className="text-3xl font-bold text-white mb-2">Bauman Code Tournament</h1>
                <div className="text-lg text-slate-300 flex items-center justify-center gap-4">
                    {currentTime?.toLocaleTimeString("ru-RU") || "--:--:--"}
                    {isUpdating && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                </div>
            </div>

            {/* Таблица */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-slate-800 border-b-2 border-slate-700">
                    <tr>
                        <th className="text-left p-3 font-bold border-r border-slate-700 min-w-8">Место</th>
                        <th className="text-left p-3 font-bold border-r border-slate-700 min-w-48">Команда</th>
                        {mockGames.map((game) => (
                            <th key={game.id} className="text-center p-2 font-bold border-r border-slate-700 min-w-32">
                                <div className="text-xs">{game.name}</div>
                                <div className="text-xs text-slate-400">макс. {game.maxPoints}</div>
                            </th>
                        ))}
                        <th className="text-center p-3 font-bold min-w-24">
                            <div>Итого</div>
                            <div className="text-xs text-slate-400">баллы</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockData.map((team, index) => (
                        <tr
                            key={team.teamId}
                            className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                                team.overallRank <= 3 ? 'bg-gradient-to-r from-yellow-900/20 to-amber-900/20' : ''
                            }`}
                        >
                            {/* Место */}
                            <td className="p-3 font-bold text-center border-r border-slate-700">
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                    team.overallRank === 1 ? 'bg-yellow-500 text-black' :
                                        team.overallRank === 2 ? 'bg-slate-300 text-black' :
                                            team.overallRank === 3 ? 'bg-amber-500 text-black' :
                                                'bg-slate-700 text-white'
                                }`}>
                                    {team.overallRank}
                                </div>
                            </td>

                            {/* Название команды */}
                            <td className="p-3 font-semibold border-r border-slate-700">
                                <div className="truncate">{team.teamName}</div>
                            </td>

                            {/* Результаты по играм */}
                            {mockGames.map((game) => {
                                const gameResult = team.gameResults.find(gr => gr.gameId === game.id)
                                return (
                                    <td key={game.id} className="text-center p-2 border-r border-slate-700">
                                        {gameResult ? (
                                            <div className={gameResult.hasError ? 'text-red-400' : ''}>
                                                <div className="font-bold">
                                                    {gameResult.hasError ? 'ERR' : gameResult.points}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {gameResult.hasError ? 'ошибка' : `#${gameResult.rank}`}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-slate-500">
                                                <div>—</div>
                                                <div className="text-xs">—</div>
                                            </div>
                                        )}
                                    </td>
                                )
                            })}

                            {/* Общий счет */}
                            <td className="text-center p-3">
                                <div className="font-bold text-lg">{team.totalPoints}</div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}