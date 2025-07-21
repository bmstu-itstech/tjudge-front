"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "Bauman Code Tournament",
    maxTeamSize: 4,
    autoStartGames: false,
    judgeTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: ".py,.cpp,.java",
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
              <Label htmlFor="autoStart">Автоматический запуск игр</Label>
              <Switch
                id="autoStart"
                checked={settings.autoStartGames}
                onCheckedChange={(checked) => setSettings({ ...settings, autoStartGames: checked })}
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
      </div>
    </div>
  )
}
