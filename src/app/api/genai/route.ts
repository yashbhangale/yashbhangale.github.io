import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('No server-side GEMINI_API_KEY configured')
      return NextResponse.json({ error: 'No API key configured on server' }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${context || ''}\n\nUser question: "${question}"\n\nRespond in 2-3 sentences maximum. Be direct and concise. Include relevant links when asked. Don't repeat information unless specifically requested.`
    })

    return NextResponse.json({ text: response.text || '' })
  } catch (err) {
    console.error('GenAI proxy error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
