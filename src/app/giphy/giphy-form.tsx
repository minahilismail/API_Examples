'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GiphyForm() {
  const [query, setQuery] = useState('')
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/giphy?query=${query}`)
      const data = await res.json()
      setGifs(data.data)
    } catch (error) {
      console.error('Error fetching GIFs:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter GIF search query"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search GIFs'}
          </Button>
        </div>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gifs.map((gif: any) => (
          <Card key={gif.id}>
            <CardContent className="p-2">
              <img 
                src={gif.images.fixed_height.url} 
                alt={gif.title} 
                className="w-full h-48 object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

