"use client"
import { ThemeToggle } from "@/components/ThemeToggle"

export function ProfileSettings() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
      <div className="flex items-center gap-4">
        <span className="font-medium text-slate-700 dark:text-slate-200">Тема</span>
        <ThemeToggle />
      </div>
    </div>
  )
} 