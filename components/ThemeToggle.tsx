"use client"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Переключить тему"
      onClick={toggleTheme}
      className="transition-colors"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
} 