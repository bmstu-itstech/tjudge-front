"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Users, UserPlus, ArrowLeft, Eye, EyeOff, UserCheck, LogIn } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  // --- Регистрация ---
  const [regUsername, setRegUsername] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState(() => Math.random().toString(36).slice(-8))
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true)
    setError("")

    try {
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      await login(username, password)
      router.push("/")
    } catch (err) {
      setError("Неверные учетные данные")
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinTeam = async (formData: FormData) => {
    setIsLoading(true)
    setError("")

    try {
      const teamCode = formData.get("teamCode") as string
      const username = formData.get("username") as string
      const password = formData.get("password") as string


      await fetch("/api/auth/join-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamCode, username, password }),
      })

      await login(username, password)
      router.push("/")
    } catch (err) {
      setError("Ошибка при присоединении к команде")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    // Мок регистрации
    setTimeout(() => {
      setIsLoading(false)
      setRegSuccess(true)
      setTimeout(() => {
        setRegSuccess(false)
        router.push("/auth/login")
      }, 1200)
    }, 1000)
  }

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
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
          <CardDescription>Войдите в свой аккаунт, зарегистрируйтесь или присоединитесь к команде</CardDescription>
        </CardHeader>

        <CardContent className="pt-2">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="flex w-auto mx-auto">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Вход
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Регистрация
              </TabsTrigger>
              <TabsTrigger value="join" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Присоединиться
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-2">
              <form action={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input id="username" name="username" type="text" placeholder="Введите имя пользователя" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" name="password" type="password" placeholder="Введите пароль" required />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Войти
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-2">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Имя пользователя</Label>
                  <Input id="reg-username" value={regUsername} onChange={e => setRegUsername(e.target.value)} required placeholder="Введите имя пользователя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email (опционально)</Label>
                  <Input id="reg-email" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="reg-password"
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      required
                      placeholder="Введите или сгенерируйте пароль"
                    />
                    <Button type="button" variant="outline" onClick={() => setShowRegPassword(v => !v)}>
                      {showRegPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setRegPassword(Math.random().toString(36).slice(-8))} title="Сгенерировать пароль">
                      <UserCheck className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Пароль можно ввести вручную или сгенерировать автоматически.</div>
                </div>
                {regSuccess && (
                  <Alert variant="default">
                    <AlertDescription>Регистрация успешна! Перенаправление...</AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Зарегистрироваться
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="join" className="mt-2">
              <form action={handleJoinTeam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamCode">Код команды</Label>
                  <Input id="teamCode" name="teamCode" type="text" placeholder="Введите код команды" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Ваше имя</Label>
                  <Input id="username" name="username" type="text" placeholder="Введите ваше имя" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" name="password" type="password" placeholder="Создайте пароль" required />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Присоединиться к команде
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


