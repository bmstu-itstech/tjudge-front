import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

const mockContests = [
  {
    id: "1",
    name: "Весенний контест 2024",
    date: "2024-05-20",
    games: [
      { id: "g1", name: "Задача A", tag: "judge_a", description: "Решите задачу A", rules: "Обычные правила" },
      { id: "g2", name: "Задача B", tag: "judge_b", description: "Решите задачу B", rules: "Обычные правила" },
      { id: "g3", name: "Задача C", tag: "judge_c", description: "Решите задачу C", rules: "Обычные правила" },
    ]
  },
  {
    id: "2",
    name: "Осенний контест 2023",
    date: "2023-11-10",
    games: [
      { id: "g4", name: "Задача X", tag: "judge_x", description: "Решите задачу X", rules: "Обычные правила" },
    ]
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 absolute inset-0">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">Bauman Code Tournament</h1>
        </div>
        <div className="space-y-10">
          {mockContests.map(contest => (
            <div key={contest.id} className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div className="text-2xl font-bold text-slate-900">{contest.name}</div>
                <div className="text-slate-500 text-base">{new Date(contest.date).toLocaleDateString("ru-RU")}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contest.games.map(game => (
                  <div key={game.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg text-slate-800">{game.name}</span>
                      <span className="text-xs bg-slate-200 text-slate-600 rounded px-2 py-0.5 font-mono">{game.tag}</span>
                    </div>
                    <div className="text-slate-600 text-sm mb-1 truncate">{game.description}</div>
                    <div className="text-slate-400 text-xs mb-2 line-clamp-2">{game.rules}</div>
                    <Link href={`/games/${game.id}`} className="mt-auto text-blue-700 hover:underline text-sm font-medium underline-fix">Перейти к задаче</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
