"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GamesManagement } from "./games-management"
import { TeamsManagement } from "./teams-management"
import { UsersManagement } from "./users-management"
import { SystemSettings } from "./system-settings"
import { Gamepad2, Users, UserCheck, Settings, Trophy } from "lucide-react"
import { ContestsManagement } from "./contests-management"



export function AdminDashboard() {
  return (
    <Tabs defaultValue="games" className="w-full">
      <TabsList className="grid w-full grid-cols-5 mb-8">
        <TabsTrigger value="games" className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          Игры
        </TabsTrigger>
        <TabsTrigger value="contests" className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Контесты
        </TabsTrigger>
        <TabsTrigger value="teams" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Команды
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          Участники
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Настройки
        </TabsTrigger>
      </TabsList>

      <TabsContent value="games">
        <GamesManagement />
      </TabsContent>

      <TabsContent value="contests">
        <ContestsManagement />
      </TabsContent>

      <TabsContent value="teams">
        <TeamsManagement />
      </TabsContent>

      <TabsContent value="users">
        <UsersManagement />
      </TabsContent>

      <TabsContent value="settings">
        <SystemSettings />
      </TabsContent>
    </Tabs>
  )
}
