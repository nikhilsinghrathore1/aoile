import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/error', req.url)) 
  }

  try {
    const clientId = process.env.GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET

    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const accessToken = tokenRes.data.access_token

    const redirectUrl = new URL('/', req.url) 
    redirectUrl.searchParams.set('token', accessToken) 

    return NextResponse.redirect(redirectUrl)
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL('/error', req.url)) 
  }
}
