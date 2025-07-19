'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function JoinRedirectPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  useEffect(() => {
    router.replace(`/register/${params.token}`)
  }, [params.token, router])
  return null
}

