"use client"

import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, AlertCircle, Trophy } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { user, logout } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      setError("Ошибка при выходе из системы")
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors">
              BCT
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {user && (
              <Link href="/" className="text-slate-600 hover:text-slate-800 transition-colors">
                Игры
              </Link>
              )}
              {user && !user.isAdmin && (
                <Link href="/my-tournament" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Мой турнир
              </Link>
              )}
              {user?.isAdmin && (
                <Link href="/admin" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Админка
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-slate-200">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{user.username}</span>
                        {user.team && <span className="text-sm text-slate-500">{user.team.name}</span>}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-tournament" className="flex items-center">
                        <Trophy className="mr-2 h-4 w-4" />
                        Мой турнир
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Настройки
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild>
                  <Link href="/auth/login">Войти</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2">
          <div className="container mx-auto flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
    </>
  )
}
