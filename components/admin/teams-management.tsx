"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Users, LinkIcon, Copy, Search, Edit, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AdminSearchInput } from "./AdminSearchInput"



const mockContests = [
  { id: "1", name: "Весенний контест 2024" },
  { id: "2", name: "Осенний контест 2023" },
]

interface Team {
  id: string
  name: string
  code: string
  members: Array<{
    id: string
    username: string
    isLeader: boolean
  }>
  inviteLink: string
  contestId: string
}

const generateTeamCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}


const allUsers = [
  { id: "1", username: "alex_dev" },
  { id: "2", username: "maria_code" },
  { id: "3", username: "john_debug" },
  { id: "4", username: "temp_user_001" },
]

export function TeamsManagement() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Code Warriors",
      code: "CW2025",
      members: [
        { id: "1", username: "alex_dev", isLeader: true },
        { id: "2", username: "maria_code", isLeader: false },
      ],
      inviteLink: "https://bct.bmstu.ru/join/CW2025",
      contestId: "1"
    },
    {
      id: "2",
      name: "Debug Masters",
      code: "DM2025",
      members: [{ id: "3", username: "john_debug", isLeader: true }],
      inviteLink: "https://bct.bmstu.ru/join/DM2025",
      contestId: "2"
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamCode, setNewTeamCode] = useState(generateTeamCode())
  const [newTeamContestId, setNewTeamContestId] = useState(mockContests[0].id)

  const [teamQuery, setTeamQuery] = useState("")

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editTeam, setEditTeam] = useState<Team | null>(null)
  const [editMembers, setEditMembers] = useState<{ id: string; username: string; isLeader: boolean }[]>([])
  const [editTeamContestId, setEditTeamContestId] = useState<string>("")
  const [newMemberName, setNewMemberName] = useState("")

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      toast({ title: "Ошибка", description: "Введите название команды", variant: "destructive" });
      return;
    }
    setTeams([
      ...teams,
      {
        id: (teams.length + 1).toString(),
        name: newTeamName,
        code: newTeamCode,
        members: [],
        inviteLink: `https://bct.bmstu.ru/join/${newTeamCode}`,
        contestId: newTeamContestId
      },
    ])
    setIsCreateDialogOpen(false)
    setNewTeamName("")
    setNewTeamCode(generateTeamCode())
    setNewTeamContestId(mockContests[0].id)
    toast({ title: "Команда создана" })
  }

  const copyInviteLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Скопировано",
      description: "Ссылка-приглашение скопирована в буфер обмена",
    })
  }

  const handleEditOpen = (team: Team) => {
    setEditTeam(team)
    setEditMembers(team.members)
    setEditTeamContestId(team.contestId)
    setIsEditDialogOpen(true)
    setNewMemberName("")
  }

  const handleEditSave = () => {
    if (!editTeam) return
    setTeams(teams.map(t => t.id === editTeam.id ? { ...t, members: editMembers, contestId: editTeamContestId } : t))
    setIsEditDialogOpen(false)
    setEditTeam(null)
    setEditMembers([])
    setEditTeamContestId("")
  }

  const handleAddMember = () => {
    if (!newMemberName.trim()) return
    setEditMembers([...editMembers, { id: (Math.random() * 100000).toFixed(0), username: newMemberName.trim(), isLeader: false }])
    setNewMemberName("")
  }

  const handleRemoveMember = (id: string) => {
    setEditMembers(editMembers.filter(m => m.id !== id))
  }

  const handleToggleLeader = (id: string) => {
    setEditMembers(editMembers.map(m =>
      m.id === id
        ? { ...m, isLeader: true }
        : { ...m, isLeader: false }
    ))
  }

  const filteredUsers = allUsers.filter(
    u =>
      u.username.toLowerCase().includes(newMemberName.trim().toLowerCase()) &&
      !editMembers.some(m => m.username === u.username)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex-shrink-0">Управление командами</h2>
        <AdminSearchInput value={teamQuery} onChange={setTeamQuery} placeholder="Поиск по названию команды..." />
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Создать команду
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Создать новую команду</DialogTitle>
              <DialogDescription>Создайте команду и выберите контест</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleCreateTeam}>
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">
                  Название команды
                </label>
                <Input id="teamName" placeholder="Введите название команды" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamContest" className="text-sm font-medium">Контест</label>
                <select id="teamContest" value={newTeamContestId} onChange={e => setNewTeamContestId(e.target.value)} className="w-full border rounded px-3 py-2">
                  {mockContests.map(contest => (
                    <option key={contest.id} value={contest.id}>{contest.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="teamCode" className="text-sm font-medium">
                  Код команды
                </label>
                <div className="flex gap-2">
                  <Input id="teamCode" placeholder="Автоматически сгенерируется" value={newTeamCode} readOnly />
                  <Button type="button" variant="outline" size="sm" onClick={() => setNewTeamCode(generateTeamCode())}>
                    Обновить
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Создать команду</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {teams.filter(team => team.name.toLowerCase().includes(teamQuery.trim().toLowerCase())).map((team) => {
          const contest = mockContests.find(c => c.id === team.contestId)
          return (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {team.name}
                    </CardTitle>
                    <CardDescription className="mt-1">Код: {team.code}</CardDescription>
                    <CardDescription className="mt-1 text-blue-700">Контест: {contest ? contest.name : "-"}</CardDescription>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline">
                      {team.members.length} участник{team.members.length !== 1 ? "ов" : ""}
                    </Badge>
                    <Button variant="outline" size="icon" onClick={() => handleEditOpen(team)} title="Редактировать участников">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Участники:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.username}</span>
                        {member.isLeader && (
                          <Badge variant="secondary" className="text-xs">
                            Лидер
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Ссылка-приглашение:</h4>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <LinkIcon className="w-4 h-4 text-slate-500" />
                    <code className="flex-1 text-sm text-slate-600">{team.inviteLink}</code>
                    <Button variant="outline" size="sm" onClick={() => copyInviteLink(team.inviteLink)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )})}
      </div>
      {/* --- EDIT TEAM MEMBERS DIALOG --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать команду</DialogTitle>
            <DialogDescription>Измените участников и контест</DialogDescription>
          </DialogHeader>
          {editTeam && (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              <div className="space-y-2">
                <label htmlFor="editTeamName" className="text-sm font-medium">Название команды</label>
                <Input id="editTeamName" value={editTeam.name} onChange={e => setEditTeam({ ...editTeam, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="editTeamContest" className="text-sm font-medium">Контест</label>
                <select id="editTeamContest" value={editTeamContestId} onChange={e => setEditTeamContestId(e.target.value)} className="w-full border rounded px-3 py-2">
                  {mockContests.map(contest => (
                    <option key={contest.id} value={contest.id}>{contest.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Участники</label>
                <div className="flex flex-col gap-2">
                  {editMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 bg-slate-100 rounded px-3 py-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.username}</span>
                      <Button type="button" size="icon" variant={member.isLeader ? "secondary" : "outline"} onClick={() => handleToggleLeader(member.id)} title="Сделать лидером/убрать лидера">
                        L
                      </Button>
                      <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveMember(member.id)} title="Удалить">
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-2 relative">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Имя нового участника"
                    value={newMemberName}
                    onChange={e => setNewMemberName(e.target.value)}
                    className="w-full"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddMember(); } }}
                    autoComplete="off"
                  />
                  {newMemberName && filteredUsers.length > 0 && (
                    <div className="absolute z-10 left-0 right-0 bg-white border border-slate-200 rounded shadow mt-1 max-h-40 overflow-y-auto">
                      {filteredUsers.map(u => (
                        <div
                          key={u.id}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                          onClick={() => setNewMemberName(u.username)}
                        >
                          {u.username}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="button" onClick={handleAddMember} disabled={!newMemberName.trim()}>Добавить</Button>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="button" onClick={handleEditSave}>Сохранить</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
