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

interface Game {
  id: string
  name: string
  tag: string
  description: string
  status: "upcoming" | "active" | "finished"
  startTime?: string
  endTime?: string
  rules?: string
  allowedFileTypes?: string
}

export function GamesManagement() {
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      name: "Алгоритмы и структуры данных",
      tag: "algorithms",
      description: "Соревнование по решению алгоритмических задач",
      status: "active",
    },
    {
      id: "2",
      name: "Машинное обучение",
      tag: "ml",
      description: "Задачи по машинному обучению и анализу данных",
      status: "upcoming",
      startTime: "2025-01-15T10:00:00Z",
    },
  ])

  const [tagQuery, setTagQuery] = useState("")

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGame, setNewGame] = useState<Pick<Game, 'name' | 'tag' | 'description' | 'status' | 'rules' | 'allowedFileTypes'>>({
    name: "",
    tag: "",
    description: "",
    status: "upcoming",
    rules: "",
    allowedFileTypes: ".py"
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editGame, setEditGame] = useState<Game | null>(null)

  const handleStatusChange = (gameId: string, newStatus: Game["status"]) => {
    setGames(games.map((game) => (game.id === gameId ? { ...game, status: newStatus } : game)))
  }

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

  const getStatusIcon = (status: Game["status"]) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4" />
      case "upcoming":
        return <Pause className="w-4 h-4" />
      case "finished":
        return <Square className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Game["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "finished":
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex-shrink-0">Управление играми</h2>
        <div className="relative w-full sm:w-80 max-w-full sm:max-w-xs mt-2 sm:mt-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <Input
            type="text"
            placeholder="Поиск по тегу..."
            value={tagQuery}
            onChange={e => setTagQuery(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-lg border border-slate-300 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
          />
        </div>
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
              setNewGame({ name: "", tag: "", description: "", status: "upcoming", rules: "", allowedFileTypes: ".py" });
            }}>
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input id="name" placeholder="Название игры" value={newGame.name} onChange={e => setNewGame({ ...newGame, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Тег</Label>
                <Input id="tag" placeholder="game-tag" value={newGame.tag} onChange={e => setNewGame({ ...newGame, tag: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Описание игры" value={newGame.description} onChange={e => setNewGame({ ...newGame, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select value={newGame.status} onValueChange={value => setNewGame({ ...newGame, status: value as Game["status"] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Скоро</SelectItem>
                    <SelectItem value="active">Активно</SelectItem>
                    <SelectItem value="finished">Завершено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rules">Правила (онлайн-редактор)</Label>
                <Textarea id="rules" placeholder="Введите или вставьте правила игры..." value={newGame.rules} onChange={e => setNewGame({ ...newGame, rules: e.target.value })} className="min-h-[120px] max-h-60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Допустимые расширения файлов для загрузки (через запятую, например: .py,.cpp,.java)</Label>
                <Input id="allowedFileTypes" placeholder=".py,.cpp,.java" value={newGame.allowedFileTypes || ""} onChange={e => setNewGame({ ...newGame, allowedFileTypes: e.target.value })} />
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
        {games.filter(game => game.tag.toLowerCase().includes(tagQuery.trim().toLowerCase())).map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                  <CardDescription className="mt-1">Тег: {game.tag}</CardDescription>
                </div>
                <Badge className={getStatusColor(game.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(game.status)}
                    {game.status === "active" ? "Активно" : game.status === "upcoming" ? "Скоро" : "Завершено"}
                  </div>
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-slate-600 mb-4">{game.description}</p>

              <div className="flex items-center gap-2">
                <Select
                  value={game.status}
                  onValueChange={(value: Game["status"]) => handleStatusChange(game.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Скоро</SelectItem>
                    <SelectItem value="active">Активно</SelectItem>
                    <SelectItem value="finished">Завершено</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={() => handleEditOpen(game)}>
                  <Edit className="w-4 h-4" />
                </Button>

                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent" onClick={() => handleDelete(game.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать игру</DialogTitle>
            <DialogDescription>Измените информацию об игре</DialogDescription>
          </DialogHeader>
          {editGame && (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название</Label>
                <Input id="edit-name" value={editGame.name} onChange={e => setEditGame({ ...editGame, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tag">Тег</Label>
                <Input id="edit-tag" value={editGame.tag} onChange={e => setEditGame({ ...editGame, tag: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea id="edit-description" value={editGame.description} onChange={e => setEditGame({ ...editGame, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Статус</Label>
                <Select value={editGame.status} onValueChange={value => setEditGame({ ...editGame, status: value as Game["status"] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Скоро</SelectItem>
                    <SelectItem value="active">Активно</SelectItem>
                    <SelectItem value="finished">Завершено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rules">Правила</Label>
                <Textarea id="edit-rules" value={editGame.rules || ""} onChange={e => setEditGame({ ...editGame, rules: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-allowedFileTypes">Допустимые расширения файлов для загрузки (через запятую, например: .py,.cpp,.java)</Label>
                <Input id="edit-allowedFileTypes" value={editGame.allowedFileTypes || ""} onChange={e => setEditGame({ ...editGame, allowedFileTypes: e.target.value })} />
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
