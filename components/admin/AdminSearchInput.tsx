import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"


interface AdminSearchInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function AdminSearchInput({ value, onChange, placeholder }: AdminSearchInputProps) {
  return (
    <div className="relative w-full sm:w-80 max-w-full sm:max-w-xs mt-2 sm:mt-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <Search className="w-5 h-5" />
      </span>
      <Input
        type="text"
        placeholder={placeholder || "Поиск..."}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10 pr-3 py-2 rounded-lg border border-slate-300 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
      />
    </div>
  )
} 