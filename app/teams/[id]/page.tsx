"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockTeam = {
  id: "1",
  name: "Code Warriors",
  code: "CW2025",
  inviteLink: "https://bct.bmstu.ru/join/CW2025",
  members: [
    { id: "1", username: "alex_dev", isLeader: true },
    { id: "2", username: "maria_code", isLeader: false },
  ],
}

export default function TeamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  // TODO: по айдишке фетчить команды
  const team = mockTeam

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">{team.name}</CardTitle>
          <div className="text-slate-500 text-sm mt-1">Код: {team.code}</div>
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
                    <Badge variant="secondary" className="text-xs">Лидер</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Ссылка-приглашение:</h4>
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <code className="flex-1 text-sm text-slate-600">{team.inviteLink}</code>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(team.inviteLink)}>Скопировать</Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/teams")}>Выйти из команды</Button>
            <Button variant="destructive" onClick={() => alert("Удалить команду (TODO)")}>Удалить команду</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 