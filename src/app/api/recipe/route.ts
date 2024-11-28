import { NextResponse } from 'next/server'

const API_KEY = process.env.SPOONACULAR_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=10`)
  const data = await res.json()

  if (res.ok) {
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: data.message }, { status: res.status })
  }
}

