import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link href="/weather">
        <Card>
          <CardHeader>
            <CardTitle>Weather API</CardTitle>
            <CardDescription>Get current weather information for a location</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/recipe">
        <Card>
          <CardHeader>
            <CardTitle>Recipe API</CardTitle>
            <CardDescription>Search for recipes and get cooking instructions</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/giphy">
        <Card>
          <CardHeader>
            <CardTitle>Giphy API</CardTitle>
            <CardDescription>Search for and display GIFs</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/movies">
        <Card>
          <CardHeader>
            <CardTitle>Movie API</CardTitle>
            <CardDescription>Search for movies and get details</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}

