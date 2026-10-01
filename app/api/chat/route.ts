import {salesReply, type SalesMessage} from '@/lib/sales-assistant';
import {faqs} from '@/data/faq';
import {services} from '@/data/services';
const env=process.env;
import {chatbotKnowledge} from '@/data/chatbot-knowledge';
import {database} from '@/lib/database';
export async function POST(req:Request){if(!req.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'Invalid format'},{status:415});let body;try{const raw=await req.text();if(raw.length>14000)throw Error();body=JSON.parse(raw);}catch{return Response.json({error:'Invalid request'},{status:400});}if(typeof body.message!=='string'||!body.message.trim()||body.message.length>1000)return Response.json({error:'Ask a question up to 1,000 characters.'},{status:400});const history:SalesMessage[]=Array.isArray(body.history)?body.history.slice(-8).filter((m:unknown):m is SalesMessage=>!!m&&typeof m==='object'&&'role' in m&&'text' in m&&(m.role==='user'||m.role==='assistant')&&typeof m.text==='string'&&m.text.length<=1000):[];
const config=env as unknown as {OPENAI_API_KEY?:string,OPENAI_MODEL?:string};
if(config.OPENAI_API_KEY&&config.OPENAI_MODEL){try{
const identity=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'shared';
const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity));
const hash=Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,'0')).join('');
const db=database();const now=Date.now();
const allowed=await db.prepare('INSERT INTO chat_limits (id, count, created_at) VALUES (?, 1, ?) ON CONFLICT(id) DO UPDATE SET count = count + 1 WHERE count < 15 RETURNING count').bind(hash+':'+Math.floor(now/60000),now).first();
if(!allowed)return Response.json({reply:'For more help, call 772-666-1029 or request a free audit.',mode:'faq'});
await db.prepare('DELETE FROM chat_limits WHERE created_at < ?').bind(now-86400000).run();
const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:'Bearer '+config.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:config.OPENAI_MODEL,store:false,instructions:chatbotKnowledge,input:[...history.map(m=>({role:m.role,content:m.text})),{role:"user",content:body.message}],max_output_tokens:400}),signal:AbortSignal.timeout(15000)});
if(response.ok){const result=await response.json() as {output?:{content?:{type?:string,text?:string}[]}[]};const reply=result.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n');if(reply)return Response.json({reply,mode:'ai'});}
}catch{console.error('AI assistant unavailable; using approved FAQ fallback');}}
return Response.json({reply:salesReply(body.message,history),mode:'faq'});}
