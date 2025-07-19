import { useContext } from "react"
import { useThemeContext } from "@/components/ThemeProvider"

export function useTheme() {
  return useThemeContext()
}

