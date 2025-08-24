import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Trophy, Medal, Award } from 'lucide-react';

interface GameResult {
    gameId: string;
    gameName: string;
    points?: number;
    rank?: number;
    hasError: boolean;
}

interface TeamLeaderboard {
    teamId: string;
    teamName: string;
    totalPoints: number;
    overallRank: number;
    gameResults: GameResult[];
}

interface GameLeaderboardProps {
    gameId: string;
}

type SortField = 'teamName' | 'totalPoints' | 'overallRank' | string; // string для gameId
type SortDirection = 'asc' | 'desc';

export function GameLeaderboard({ gameId }: GameLeaderboardProps) {
    const mockGames = [
        { id: 'a', name: 'Сумма массива', maxPoints: 100 },
        { id: 'b', name: 'Поиск в строке', maxPoints: 100 },
        { id: 'c', name: 'Динамическое программирование', maxPoints: 200 },
        { id: 'd', name: 'Графы и кратчайшие пути', maxPoints: 300 }
    ];

    const mockData: TeamLeaderboard[] = [
        {
            teamId: '1',
            teamName: 'CodeMasters',
            totalPoints: 340,
            overallRank: 1,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 100,  rank: 1, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 85,  rank: 3, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 95,  rank: 2, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 60,  rank: 8, hasError: false }
            ]
        },
        {
            teamId: '2',
            teamName: 'AlgoWarriors',
            totalPoints: 330,
            overallRank: 2,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 95,  rank: 2, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 100,  rank: 1, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 75,  rank: 5, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 60,  rank: 7, hasError: false }
            ]
        },
        {
            teamId: '3',
            teamName: 'ByteBusters',
            totalPoints: 315,
            overallRank: 3,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 90,  rank: 3, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 90,  rank: 2, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование',  hasError: true },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 35,  rank: 11, hasError: false }
            ]
        },
        {
            teamId: '4',
            teamName: 'LogicLords',
            totalPoints: 280,
            overallRank: 4,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 80,  rank: 5, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке', points: 70,  rank: 6, hasError: false },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 100,  rank: 1, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 30,  rank: 12, hasError: false }
            ]
        },
        {
            teamId: '5',
            teamName: 'DataDynamos',
            totalPoints: 275,
            overallRank: 5,
            gameResults: [
                { gameId: 'a', gameName: 'Сумма массива', points: 85,  rank: 4, hasError: false },
                { gameId: 'b', gameName: 'Поиск в строке',  hasError: true },
                { gameId: 'c', gameName: 'Динамическое программирование', points: 90,  rank: 3, hasError: false },
                { gameId: 'd', gameName: 'Графы и кратчайшие пути', points: 100,  rank: 1, hasError: false }
            ]
        }
    ];

    const [sortField, setSortField] = useState<SortField>('overallRank');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        return [...mockData].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            if (sortField === 'teamName') {
                aValue = a.teamName;
                bValue = b.teamName;
            } else if (sortField === 'totalPoints') {
                aValue = a.totalPoints;
                bValue = b.totalPoints;
            } else if (sortField === 'overallRank') {
                aValue = a.overallRank;
                bValue = b.overallRank;
            } else {
                // Сортировка по игре
                const aGame = a.gameResults.find(g => g.gameId === sortField);
                const bGame = b.gameResults.find(g => g.gameId === sortField);

                if (aGame?.hasError && bGame?.hasError) {
                    aValue = bValue = 0; // Оба с ошибкой - равны
                } else if (aGame?.hasError) {
                    aValue = -1; // Ошибка идет в конец
                } else if (bGame?.hasError) {
                    bValue = -1; // Ошибка идет в конец
                } else {
                    aValue = aGame?.points || 0;
                    bValue = bGame?.points || 0;
                }
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [mockData, sortField, sortDirection]);

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ?
            <ChevronUp className="w-4 h-4 ml-1" /> :
            <ChevronDown className="w-4 h-4 ml-1" />;
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
        if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />;
        return null;
    };

    const formatGameResult = (result: GameResult) => {
        if (result.hasError) {
            return (
                <div className="text-center">
                    <span className="text-red-600 font-medium">ERROR</span>
                    <span className="text-slate-400 ml-1">(-)</span>
                </div>
            );
        }

        return (
            <div className="text-center">
                <span className="font-medium">{result.points || 0}</span>
                <span className="text-slate-500 ml-1">({result.rank || '-'})</span>
            </div>
        );
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Таблица лидеров
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">
                                <Button
                                    variant="ghost"
                                    className="p-0 h-auto font-semibold hover:bg-transparent"
                                    onClick={() => handleSort('teamName')}
                                >
                                    Команда
                                    {getSortIcon('teamName')}
                                </Button>
                            </th>

                            {mockGames.map((game) => (
                                <th key={game.id} className="text-center py-3 px-4 font-semibold text-slate-700 min-w-[120px]">
                                    <Button
                                        variant="ghost"
                                        className="p-0 h-auto font-semibold hover:bg-transparent text-center"
                                        onClick={() => handleSort(game.id)}
                                    >
                                        <div className="text-center">
                                            <div>{game.name}</div>
                                            <div className="text-xs text-slate-500 font-normal">({game.maxPoints} макс.)</div>
                                        </div>
                                        {getSortIcon(game.id)}
                                    </Button>
                                </th>
                            ))}

                            <th className="text-center py-3 px-4 font-semibold text-slate-700">
                                <Button
                                    variant="ghost"
                                    className="p-0 h-auto font-semibold hover:bg-transparent"
                                    onClick={() => handleSort('overallRank')}
                                >
                                    Общая позиция
                                    {getSortIcon('overallRank')}
                                </Button>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {sortedData.map((team, index) => (
                            <tr
                                key={team.teamId}
                                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                                    index < 3 ? 'bg-gradient-to-r from-blue-50/30 to-transparent' : ''
                                }`}
                            >
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        {getRankIcon(team.overallRank)}
                                        <span className="font-medium text-slate-800">{team.teamName}</span>
                                        {team.overallRank <= 3 && (
                                            <Badge
                                                variant="outline"
                                                className={
                                                    team.overallRank === 1
                                                        ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                                                        : team.overallRank === 2
                                                            ? "border-gray-300 bg-gray-50 text-gray-700"
                                                            : "border-amber-300 bg-amber-50 text-amber-700"
                                                }
                                            >
                                                TOP {team.overallRank}
                                            </Badge>
                                        )}
                                    </div>
                                </td>

                                {mockGames.map((game) => {
                                    const result = team.gameResults.find(r => r.gameId === game.id);
                                    return (
                                        <td key={game.id} className="py-4 px-4">
                                            {result ? formatGameResult(result) : (
                                                <div className="text-center text-slate-400">-</div>
                                            )}
                                        </td>
                                    );
                                })}

                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {getRankIcon(team.overallRank)}
                                        <span className="font-bold text-lg">#{team.overallRank}</span>
                                    </div>
                                    <div className="text-sm text-slate-500">{team.totalPoints} очков</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}