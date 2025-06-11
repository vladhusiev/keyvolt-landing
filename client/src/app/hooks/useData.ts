import { useEffect, useState } from 'react'

interface Data {
  hero_title: string
  hero_description: string
  hero_btn_name: string
  features: { id: number, icon: {url: string}, text: string }[]
  solutions: { id: number, icon: string, image: {url: string}, name: string, description: string, mainText: string }[]
}

export const useData = () => {
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = '/api/home-page'
        const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const url = new URL(path, BASE_URL)
        const response = await fetch(url.href)
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
      }
    }

    fetchData()
  }, [])

  return { data }
} 