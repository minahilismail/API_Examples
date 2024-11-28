import { NextResponse } from 'next/server'

const API_KEY = process.env.GIPHY_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=9&rating=g`)
  const data = await res.json()

  if (res.ok) {
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: data.message }, { status: res.status })
  }
}

