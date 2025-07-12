"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"

export default function RegisterByTokenPage({ params }: { params: { token: string } }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState(() => Math.random().toString(36).slice(-8))
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: интеграция с бэком
    alert(`Регистрация: ${username}, пароль: ${password}, токен: ${params.token}`)
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация по приглашению</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="flex gap-2 items-center">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                <Button type="button" variant="outline" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Скрыть" : "Показать"}</Button>
                <Button type="button" variant="ghost" onClick={() => {navigator.clipboard.writeText(password)}} title="Скопировать пароль">
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-xs text-slate-500 mt-1">Пароль сгенерирован автоматически, вы можете его изменить сейчас или после входа в профиль.</div>
            </div>
            <Button type="submit" className="w-full">Зарегистрироваться</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 