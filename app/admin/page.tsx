"use client"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Link
        href="/"
        className="mb-2 flex items-center justify-center gap-2 text-blue-700 text-xl font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        style={{ textDecoration: 'none' }}
      >
        <ArrowLeft className="w-6 h-6" />
        На главную
      </Link>
    <div className="container mx-auto py-8">
      <AdminDashboard />
      </div>
    </div>
  )
}

