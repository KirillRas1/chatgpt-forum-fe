import { NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function GET() {
  try {
    const { accessToken } = await getAccessToken();
    return Response.json({ token: accessToken });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  } 
  
}
