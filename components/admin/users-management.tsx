"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, LinkIcon, Copy, Users, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  username: string
  email?: string
  team?: {
    id: string
    name: string
  }
  status: "active" | "pending" | "inactive"
  registrationLink?: string
}

interface Team {
  id: string
  name: string
}

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "alex_dev",
      email: "alex@example.com",
      team: { id: "1", name: "Code Warriors" },
      status: "active",
    },
    {
      id: "2",
      username: "maria_code",
      team: { id: "1", name: "Code Warriors" },
      status: "active",
    },
    {
      id: "3",
      username: "john_debug",
      team: { id: "2", name: "Debug Masters" },
      status: "active",
    },
    {
      id: "4",
      username: "temp_user_001",
      status: "pending",
      registrationLink: "https://bct.bmstu.ru/register/abc123",
    },
  ])

  const [teams] = useState<Team[]>([
    { id: "1", name: "Code Warriors" },
    { id: "2", name: "Debug Masters" },
    { id: "3", name: "Syntax Heroes" },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isGenerateLinkDialogOpen, setIsGenerateLinkDialogOpen] = useState(false)
  const { toast } = useToast()

  const [newUsername, setNewUsername] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newTeamId, setNewTeamId] = useState<string | null>(null)

  const [userQuery, setUserQuery] = useState("")

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      toast({ title: "Ошибка", description: "Введите имя пользователя", variant: "destructive" });
      return;
    }
    setUsers([
      ...users,
      {
        id: (users.length + 1).toString(),
        username: newUsername,
        email: newEmail || undefined,
        team: newTeamId && newTeamId !== "none" ? teams.find(t => t.id === newTeamId) : undefined,
        status: "active",
      },
    ])
    setIsCreateDialogOpen(false)
    setNewUsername("")
    setNewEmail("")
    setNewTeamId(null)
    toast({ title: "Участник создан" })
  }

  const copyRegistrationLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Скопировано",
      description: "Ссылка для регистрации скопирована в буфер обмена",
    })
  }

  const generateRegistrationLink = () => {
    const token = Math.random().toString(36).substring(2, 15)
    return `https://bct.bmstu.ru/register/${token}`
  }

  const assignUserToTeam = (userId: string, teamId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              team: teams.find((t) => t.id === teamId),
            }
          : user,
      ),
    )

    toast({
      title: "Успешно",
      description: "Участник добавлен в команду",
    })
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive":
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "Активен"
      case "pending":
        return "Ожидает"
      case "inactive":
        return "Неактивен"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex-shrink-0">Управление участниками</h2>
        <div className="relative w-full sm:w-80 max-w-full sm:max-w-xs mt-2 sm:mt-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <Input
            type="text"
            placeholder="Поиск по имени пользователя..."
            value={userQuery}
            onChange={e => setUserQuery(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-lg border border-slate-300 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Dialog open={isGenerateLinkDialogOpen} onOpenChange={setIsGenerateLinkDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <LinkIcon className="w-4 h-4" />
                Создать ссылку
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Создать ссылку для регистрации</DialogTitle>
                <DialogDescription>Создайте персональную ссылку для регистрации нового участника</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ссылка для регистрации</label>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md border border-slate-200">
                    <input type="text" readOnly value={generateRegistrationLink()} className="flex-1 text-sm text-slate-600 bg-slate-100 rounded-md border border-slate-200 px-3 py-1" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyRegistrationLink(generateRegistrationLink())}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsGenerateLinkDialogOpen(false)}>
                    Закрыть
                  </Button>
                  <Button type="button" onClick={() => {
                    const newLink = generateRegistrationLink();
                  }}>Создать новую ссылку</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Добавить участника
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Добавить нового участника</DialogTitle>
                <DialogDescription>Создайте аккаунт для нового участника</DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleCreateUser}>
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Имя пользователя
                  </label>
                  <Input id="username" placeholder="Введите имя пользователя" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email (опционально)
                  </label>
                  <Input id="email" type="email" placeholder="user@example.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="team" className="text-sm font-medium">
                    Команда
                  </label>
                  <Select value={newTeamId ?? "none"} onValueChange={setNewTeamId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите команду" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Без команды</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">Создать участника</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {users.filter(user => user.username.toLowerCase().includes(userQuery.trim().toLowerCase())).map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.username}</CardTitle>
                    {user.email && <CardDescription>{user.email}</CardDescription>}
                  </div>
                </div>
                <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{user.team ? user.team.name : "Без команды"}</span>
                </div>

                {!user.team && user.status === "active" && (
                  <Select onValueChange={(teamId) => assignUserToTeam(user.id, teamId)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Назначить в команду" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {user.registrationLink && (
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Ссылка для регистрации:</h4>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <LinkIcon className="w-4 h-4 text-slate-500" />
                    <code className="flex-1 text-sm text-slate-600">{user.registrationLink}</code>
                    <Button variant="outline" size="sm" onClick={() => copyRegistrationLink(user.registrationLink!)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
