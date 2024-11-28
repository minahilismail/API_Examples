import { NextResponse } from 'next/server'

const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
  const data = await res.json()

  if (res.ok) {
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: data.message }, { status: res.status })
  }
}

