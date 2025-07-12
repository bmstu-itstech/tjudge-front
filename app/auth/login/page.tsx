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
import { Loader2, Users, UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

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
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
          <CardDescription>Войдите в свой аккаунт или присоединитесь к команде</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Вход
              </TabsTrigger>
              <TabsTrigger value="join" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Присоединиться
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
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

            <TabsContent value="join">
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
