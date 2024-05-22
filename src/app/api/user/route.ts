import {NextResponse} from 'next/server';

import {addUser} from '@/providers/admin/user';
import {IUser} from '@/types';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IUser;
    console.log(body);
    const rs = await addUser(body);
    return NextResponse.json(rs);
  } catch (error) {
    return NextResponse.json(error);
  }
}
