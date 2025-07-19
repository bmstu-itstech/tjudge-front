"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Save, RefreshCw, Database, Bell, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "Bauman Code Tournament",
    maxTeamSize: 4,
    allowLateRegistration: true,
    autoStartGames: false,
    notificationsEnabled: true,
    maintenanceMode: false,
    judgeTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: ".py,.cpp,.java",
    systemMessage: "",
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Настройки сохранены",
      description: "Системные настройки успешно обновлены",
    })
  }

  const handleReset = () => {
    toast({
      title: "Настройки сброшены",
      description: "Настройки возвращены к значениям по умолчанию",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Системные настройки</h2>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 text-base font-medium mb-2">
          <span>Функционал с БД</span>
          <span className="px-2 py-0.5 bg-yellow-200 rounded text-sm font-semibold">В разработке</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Общие настройки
            </CardTitle>
            <CardDescription>Основные параметры системы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Название сайта</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTeamSize">Максимальный размер команды</Label>
              <Input
                id="maxTeamSize"
                type="number"
                min="1"
                max="10"
                value={settings.maxTeamSize}
                onChange={(e) => setSettings({ ...settings, maxTeamSize: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lateRegistration">Разрешить позднюю регистрацию</Label>
              <Switch
                id="lateRegistration"
                checked={settings.allowLateRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowLateRegistration: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoStart">Автоматический запуск игр</Label>
              <Switch
                id="autoStart"
                checked={settings.autoStartGames}
                onCheckedChange={(checked) => setSettings({ ...settings, autoStartGames: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance">Режим обслуживания</Label>
              <Switch
                id="maintenance"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Настройки судейства
            </CardTitle>
            <CardDescription>Параметры проверки решений</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judgeTimeout">Таймаут судьи (секунды)</Label>
              <Input
                id="judgeTimeout"
                type="number"
                min="10"
                max="300"
                value={settings.judgeTimeout}
                onChange={(e) => setSettings({ ...settings, judgeTimeout: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Максимальный размер файла (МБ)</Label>
              <Input
                id="maxFileSize"
                type="number"
                min="1"
                max="100"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileTypes">Разрешенные типы файлов</Label>
              <Input
                id="fileTypes"
                placeholder=".py,.cpp,.java"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Уведомления
            </CardTitle>
            <CardDescription>Настройки системных уведомлений</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Включить уведомления</Label>
              <Switch
                id="notifications"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, notificationsEnabled: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemMessage">Системное сообщение</Label>
              <Textarea
                id="systemMessage"
                placeholder="Введите сообщение для отображения всем пользователям"
                value={settings.systemMessage}
                onChange={(e) => setSettings({ ...settings, systemMessage: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              База данных
            </CardTitle>
            <CardDescription>Управление данными системы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Создать резервную копию
            </Button>

            <Button variant="outline" className="w-full bg-transparent">
              Восстановить из копии
            </Button>

            <Button variant="destructive" className="w-full">
              Очистить все результаты
            </Button>

            <div className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
              <p>
                <strong>Последняя резервная копия:</strong> 12.01.2025 14:30
              </p>
              <p>
                <strong>Размер базы данных:</strong> 45.2 МБ
              </p>
              <p>
                <strong>Количество записей:</strong> 1,247
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
