"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, User, Mail, Shield, Bell, Palette, Settings, Trophy, FileText } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

const mockUser = {
  username: "alex_dev",
  email: "alex@example.com",
  fullName: "Александр Петров",
  bio: "Разработчик программного обеспечения, участник соревнований по программированию",
  joinDate: "2023-01-15",
  team: {
    name: "Code Warriors",
    role: "Лидер"
  }
}

export default function ProfilePage() {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [showEmail, setShowEmail] = useState(true)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      alert("Пароль должен содержать минимум 6 символов")
      return
    }
    alert("Пароль успешно изменён")
    setPassword("")
    setNewPassword("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-6 h-6" />
          На главную
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Профиль пользователя */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="w-6 h-6" />
                Профиль пользователя
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" value={mockUser.username} disabled />
                  </div>
                  <div>
                    <Label htmlFor="fullName">Полное имя</Label>
                    <Input id="fullName" value={mockUser.fullName} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Input id="email" value={mockUser.email} />
                      <Switch 
                        checked={showEmail} 
                        onCheckedChange={setShowEmail}
                      />
                      <span className="text-sm text-slate-600">Публичный</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea 
                      id="bio" 
                      value={mockUser.bio} 
                      rows={4}
                      placeholder="Расскажите о себе..."
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Дата регистрации</div>
                    <div className="text-sm font-medium">
                      {new Date(mockUser.joinDate).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Команда</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mockUser.team.name}</span>
                      <Badge variant="secondary">{mockUser.team.role}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Сохранить изменения</Button>
              </div>
            </CardContent>
          </Card>

          {/* Смена пароля */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Смена пароля
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    Минимум 6 символов
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Сменить пароль</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Настройки уведомлений */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Настройки уведомлений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email уведомления</div>
                  <div className="text-sm text-slate-600">
                    Получать уведомления о новых играх и результатах
                  </div>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push уведомления</div>
                  <div className="text-sm text-slate-600">
                    Уведомления в браузере
                  </div>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Внешний вид */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Внешний вид
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Тема оформления</div>
                  <div className="text-sm text-slate-600">
                    Выберите светлую или темную тему
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link href="/my-tournament">
                    <Trophy className="w-6 h-6" />
                    <span>Мой турнир</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link href="/games">
                    <FileText className="w-6 h-6" />
                    <span>Все игры</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

