"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

const mockUser = {
  username: "alex_dev",
  email: "alex@example.com",
  team: { id: "1", name: "Code Warriors" },
}

export default function ProfilePage() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Link
        href="/"
        className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        style={{ textDecoration: 'none' }}
      >
        <ArrowLeft className="w-6 h-6" />
        На главную
      </Link>
      <Card className="w-full max-w-md shadow-lg border border-slate-200">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-500 mb-2">
            {mockUser.username[0].toUpperCase()}
          </div>
          <CardTitle className="text-2xl text-center font-bold">Профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div className="space-y-4">
            <div>
              <div className="text-slate-700 font-medium">Имя пользователя</div>
              <div className="mb-2 text-slate-900 font-semibold">{mockUser.username}</div>
            </div>
            <div>
              <div className="text-slate-700 font-medium">Email</div>
              <div className="mb-2 text-slate-900 font-semibold">{mockUser.email}</div>
            </div>
          <div>
              <div className="text-slate-700 font-medium">Команда</div>
              <div className="mb-2 text-slate-900 font-semibold">{mockUser.team.name}</div>
            </div>
          </div>
          <form className="space-y-2 pt-2" onSubmit={e => { e.preventDefault(); alert("Пароль изменён (заглушка)") }}>
            <Label htmlFor="password">Новый пароль</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="flex justify-center pt-2">
              <Button type="submit" className="w-full">Сменить пароль</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-6">
        <ThemeToggle />
      </div>
    </div>
  )
} 