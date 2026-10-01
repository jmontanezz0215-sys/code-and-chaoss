import {NextResponse,type NextRequest} from 'next/server';
import {ownerAuthorized} from '@/lib/owner-auth';
export function proxy(request:NextRequest){
 if(ownerAuthorized(request.headers.get('authorization')))return NextResponse.next();
 return new NextResponse('Owner sign-in required.',{status:401,headers:{'WWW-Authenticate':'Basic realm="Code & Chaos owner", charset="UTF-8"','Cache-Control':'no-store'}});
}
export const config={matcher:['/inbox/:path*']};
