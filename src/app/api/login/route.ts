import {NextResponse} from 'next/server';

import {addUser} from '@/providers/admin/user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rs = await addUser(body);
    return NextResponse.json(rs);
  } catch (error) {
    return NextResponse.json(error);
  }
}
