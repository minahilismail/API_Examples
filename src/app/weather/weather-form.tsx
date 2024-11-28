'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeatherForm() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<{
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    weather: { description: string }[];
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/weather?city=${city}`)
      if(res.status === 404) {
        setWeather(null)
        alert('City not found')
        setLoading(false)
        return
      }
      const data = await res.json()
      setWeather(data)
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </div>
      </form>
      {weather && (
        <Card>
          <CardHeader>
            <CardTitle>{weather?.name}, {weather?.sys?.country}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature: {weather?.main?.temp}°C</p>
            <p>Weather: {weather?.weather[0]?.description}</p>
            <p>Humidity: {weather?.main?.humidity}%</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

