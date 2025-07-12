"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, BookOpen, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface GameHeaderProps {
  gameId: string
}

const mockGames = [
  {
    id: "1",
    name: "Алгоритмы и структуры данных",
    allowedFileTypes: ".py,.cpp"
  },
  {
    id: "2",
    name: "Машинное обучение",
    allowedFileTypes: ".ipynb,.py"
  }
]

export function GameHeader({ gameId }: GameHeaderProps) {
  const [uploading, setUploading] = useState(false)
  const [lastUpload, setLastUpload] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const game = mockGames.find(g => g.id === gameId)
  const allowedFileTypes = game?.allowedFileTypes || ".py"

  if (!user) return null;

  const rules = `1. Решения принимаются только на Python.\n2. Время на задачу — 1 час.\n3. Запрещено использовать интернет.\n4. Побеждает команда с наибольшим количеством баллов.\n5. Любые вопросы — к организаторам.`

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".py")) {
      toast({
        title: "Ошибка",
        description: "Можно загружать только Python файлы (.py)",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("gameId", gameId)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setLastUpload(file.name)
        toast({
          title: "Успешно",
          description: "Файл загружен и отправлен на проверку",
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить файл",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Алгоритмы и структуры данных</h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">Активно</Badge>
            <span className="text-slate-600">24 участника</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Правила
          </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto min-w-[320px]">
              <DialogHeader>
                <DialogTitle>Правила игры</DialogTitle>
              </DialogHeader>
              <div className="whitespace-pre-line text-slate-800 text-base max-h-[60vh] overflow-y-auto px-1">
                {rules}
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" asChild>
            <Link href={`/games/${gameId}/display`} className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Полный экран
            </Link>
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {user && user.team && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 w-full">
                  <label htmlFor="file-upload" className="block w-full cursor-pointer border-2 border-dashed border-blue-200 rounded-lg p-2 min-h-[32px] text-center bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-1">
                    <Upload className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-sm text-slate-700 font-medium">Загрузить решение ({allowedFileTypes.split(',').join(', ')} файл{allowedFileTypes.includes(',') ? 'ы' : ''})</span>
                    <input
                      id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept={allowedFileTypes}
                    onChange={handleFileUpload}
                    disabled={uploading}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={e => { e.preventDefault(); fileInputRef.current?.click(); }}
                      disabled={uploading}
                      className="mt-1"
                      size="sm"
                    >
                      {uploading ? "Загрузка..." : "Выбрать файл"}
                    </Button>
                  </label>
                </div>
              </div>
            )}

            {lastUpload && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <FileText className="w-4 h-4" />
                <span>Загружено: {lastUpload}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
