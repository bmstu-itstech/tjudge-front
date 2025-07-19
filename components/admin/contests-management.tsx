"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { AdminSearchInput } from "./AdminSearchInput"

interface Game {
  id: string
  name: string
  tag: string
  description: string
  rules: string
}

interface Contest {
  id: string
  name: string
  date: string
  games: Game[]
}


const mockGames: Game[] = [
  { id: "1", name: "Задача A", tag: "judge_a", description: "Решите задачу A", rules: "Обычные правила" },
  { id: "2", name: "Задача B", tag: "judge_b", description: "Решите задачу B", rules: "Обычные правила" },
  { id: "3", name: "Задача C", tag: "judge_c", description: "Решите задачу C", rules: "Обычные правила" },
]

export function ContestsManagement() {
  const [contests, setContests] = useState<Contest[]>([
    {
      id: "1",
      name: "Весенний контест 2024",
      date: "2024-05-20",
      games: [mockGames[0], mockGames[1]]
    }
  ])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newContest, setNewContest] = useState<Omit<Contest, 'id'>>({
    name: "",
    date: "",
    games: []
  })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editContest, setEditContest] = useState<Contest | null>(null)
  const [query, setQuery] = useState("")

  const handleDelete = (contestId: string) => {
    setContests(contests.filter(c => c.id !== contestId))
  }

  const handleEditOpen = (contest: Contest) => {
    setEditContest(contest)
    setIsEditDialogOpen(true)
  }

  const handleEditSave = () => {
    if (!editContest) return
    setContests(contests.map(c => c.id === editContest.id ? editContest : c))
    setIsEditDialogOpen(false)
    setEditContest(null)
  }

  const filteredContests = contests.filter(c => c.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex-shrink-0">Управление контестами</h2>
        <AdminSearchInput value={query} onChange={setQuery} placeholder="Поиск по названию контеста..." />
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Создать контест
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новый контест</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              setContests([...contests, { ...newContest, id: (contests.length + 1).toString() }]);
              setIsCreateDialogOpen(false);
              setNewContest({ name: "", date: "", games: [] });
            }}>
              <div className="space-y-2">
                <Label htmlFor="contest-name">Название</Label>
                <Input id="contest-name" placeholder="Название контеста" value={newContest.name} onChange={e => setNewContest({ ...newContest, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contest-date">Дата</Label>
                <Input id="contest-date" type="date" value={newContest.date} onChange={e => setNewContest({ ...newContest, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Игры</Label>
                <div className="flex flex-col gap-2">
                  {mockGames.map(game => (
                    <label key={game.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newContest.games.some(g => g.id === game.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewContest({ ...newContest, games: [...newContest.games, game] })
                          } else {
                            setNewContest({ ...newContest, games: newContest.games.filter(g => g.id !== game.id) })
                          }
                        }}
                      />
                      <span>{game.name} <span className="text-xs text-slate-400">({game.tag})</span></span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Создать</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {filteredContests.map(contest => (
          <Card key={contest.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{contest.name}</CardTitle>
                  <div className="text-slate-500 text-sm mt-1">{format(new Date(contest.date), "dd.MM.yyyy")}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEditOpen(contest)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(contest.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-slate-700 text-sm font-semibold">Игры:</div>
              <ul className="list-disc pl-6 text-slate-700 text-sm">
                {contest.games.map(game => (
                  <li key={game.id}>{game.name} <span className="text-xs text-slate-400">({game.tag})</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать контест</DialogTitle>
          </DialogHeader>
          {editContest && (
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              handleEditSave();
            }}>
              <div className="space-y-2">
                <Label htmlFor="edit-contest-name">Название</Label>
                <Input id="edit-contest-name" value={editContest.name} onChange={e => setEditContest({ ...editContest, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contest-date">Дата</Label>
                <Input id="edit-contest-date" type="date" value={editContest.date} onChange={e => setEditContest({ ...editContest, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Игры</Label>
                <div className="flex flex-col gap-2">
                  {mockGames.map(game => (
                    <label key={game.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editContest.games.some(g => g.id === game.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setEditContest({ ...editContest, games: [...editContest.games, game] })
                          } else {
                            setEditContest({ ...editContest, games: editContest.games.filter(g => g.id !== game.id) })
                          }
                        }}
                      />
                      <span>{game.name} <span className="text-xs text-slate-400">({game.tag})</span></span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 