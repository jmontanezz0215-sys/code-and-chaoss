export type NotificationConfig = {
  RESEND_API_KEY?: string; NOTIFICATION_FROM_EMAIL?: string;
};
type Lead = {id:string;name:string;email:string;phone:string;business:string;service:string;website:string;message:string;kind:string};
type Delivery = 'not_configured' | 'accepted' | 'failed';
// Only business-owner destinations are used; visitor input cannot redirect alerts.
export async function notifyOwner(lead:Lead,config:NotificationConfig,send:typeof fetch=fetch):Promise<{email:Delivery}> {
  async function deliver(url:string,init:RequestInit):Promise<Delivery>{
    try {const response=await send(url,{...init,signal:AbortSignal.timeout(8000)});return response.ok?'accepted':'failed';}
    catch{return 'failed';}
  }
  const email=config.RESEND_API_KEY&&config.NOTIFICATION_FROM_EMAIL
    ?deliver('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+config.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'lead-'+lead.id},body:JSON.stringify({from:config.NOTIFICATION_FROM_EMAIL,to:['jmontanezz0215@icloud.com'],reply_to:lead.email,subject:'New Code & Chaos inquiry',text:['Inquiry ID: '+lead.id,'Type: '+lead.kind,'Name: '+lead.name,'Email: '+lead.email,'Phone: '+lead.phone,'Business: '+lead.business,'Service: '+lead.service,'Website: '+lead.website,'',lead.message].join('\n')})})
    :Promise.resolve<Delivery>('not_configured');
  return {email:await email};
}

