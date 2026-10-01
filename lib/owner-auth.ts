import {createHash,timingSafeEqual} from 'node:crypto';
export function ownerAuthorized(authorization:string|null){
 const {INBOX_USERNAME:username,INBOX_PASSWORD:password}=process.env;
 if(!username||!password||!authorization?.startsWith('Basic '))return false;
 const supplied=createHash('sha256').update(authorization.slice(6)).digest();
 const expected=createHash('sha256').update(Buffer.from(username+':'+password).toString('base64')).digest();
 return timingSafeEqual(supplied,expected);
}
