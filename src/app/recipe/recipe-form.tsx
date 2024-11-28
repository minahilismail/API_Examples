'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecipeForm() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/recipe?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setRecipes(data.results)
    } catch (error) {
      console.error('Error fetching recipes:', error)
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
            placeholder="Enter recipe search query"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Recipes'}
          </Button>
        </div>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {recipes.map((recipe: any) => (
          <Card key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover mb-2" />
              <p>Ready in {recipe.readyInMinutes} minutes</p>
              <p>Servings: {recipe.servings}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

