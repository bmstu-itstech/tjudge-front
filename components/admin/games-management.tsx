"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Play, Pause, Square, Search } from "lucide-react"
import { AdminSearchInput } from "./AdminSearchInput"

interface Game {
  id: string
  name: string
  tag: string
  description: string
  rules: string
}


export function GamesManagement() {
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      name: "Задача A",
      tag: "judge_a",
      description: "Решите задачу A",
      rules: "Обычные правила"
    },
    {
      id: "2",
      name: "Задача B",
      tag: "judge_b",
      description: "Решите задачу B",
      rules: "Обычные правила"
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGame, setNewGame] = useState<Omit<Game, 'id'>>({
    name: "",
    tag: "",
    description: "",
    rules: ""
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editGame, setEditGame] = useState<Game | null>(null)
  const [gameQuery, setGameQuery] = useState("")

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(gameQuery.trim().toLowerCase()) ||
    game.tag.toLowerCase().includes(gameQuery.trim().toLowerCase())
  )

  const handleDelete = (gameId: string) => {
    setGames(games.filter((game) => game.id !== gameId))
  }

  const handleEditOpen = (game: Game) => {
    setEditGame(game)
    setIsEditDialogOpen(true)
  }

  const handleEditSave = () => {
    if (!editGame) return
    setGames(games.map(g => g.id === editGame.id ? editGame : g))
    setIsEditDialogOpen(false)
    setEditGame(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex-shrink-0">Управление играми</h2>
        <AdminSearchInput value={gameQuery} onChange={setGameQuery} placeholder="Поиск по названию или тегу..." />
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Создать игру
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новую игру</DialogTitle>
              <DialogDescription>Заполните информацию о новой игре</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              setGames([...games, { ...newGame, id: (games.length + 1).toString() }]);
              setIsCreateDialogOpen(false);
              setNewGame({ name: "", tag: "", description: "", rules: "" });
            }}>
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input id="name" placeholder="Название игры" value={newGame.name} onChange={e => setNewGame({ ...newGame, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Технический тег (для судьи)</Label>
                <Input id="tag" placeholder="game-tag" value={newGame.tag} onChange={e => setNewGame({ ...newGame, tag: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Описание игры" value={newGame.description} onChange={e => setNewGame({ ...newGame, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rules">Правила</Label>
                <Textarea id="rules" placeholder="Введите или вставьте правила игры..." value={newGame.rules} onChange={e => setNewGame({ ...newGame, rules: e.target.value })} className="min-h-[80px] max-h-60" />
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
        {filteredGames.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                  <CardDescription className="mt-1">Тег: {game.tag}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEditOpen(game)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(game.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-slate-700 text-sm">{game.description}</div>
              <div className="text-xs text-slate-500 whitespace-pre-line">{game.rules}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать игру</DialogTitle>
          </DialogHeader>
          {editGame && (
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              handleEditSave();
            }}>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название</Label>
                <Input id="edit-name" value={editGame.name} onChange={e => setEditGame({ ...editGame, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tag">Технический тег (для судьи)</Label>
                <Input id="edit-tag" value={editGame.tag} onChange={e => setEditGame({ ...editGame, tag: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea id="edit-description" value={editGame.description} onChange={e => setEditGame({ ...editGame, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rules">Правила</Label>
                <Textarea id="edit-rules" value={editGame.rules} onChange={e => setEditGame({ ...editGame, rules: e.target.value })} className="min-h-[80px] max-h-60" />
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
