type QueryResult<T>={success:boolean;results:T[];meta?:Record<string,unknown>};
type Envelope<T>={success:boolean;result:QueryResult<T>[]};
class Statement{
 constructor(private sql:string,private params:unknown[]=[]){ }
 bind(...params:unknown[]){return new Statement(this.sql,params);}
 private async execute<T>():Promise<QueryResult<T>>{
  const {CLOUDFLARE_ACCOUNT_ID:account,CLOUDFLARE_D1_DATABASE_ID:database,CLOUDFLARE_D1_API_TOKEN:token}=process.env;
  if(!account||!database||!token)throw Error('Lead storage is not configured.');
  const response=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/d1/database/${encodeURIComponent(database)}/query`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({sql:this.sql,params:this.params}),cache:'no-store',signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw Error('Lead storage request failed.');
  const payload=await response.json() as Envelope<T>;
  const result=payload.result?.[0];
  if(!payload.success||!result?.success)throw Error('Lead storage query failed.');
  return {...result,results:result.results||[]};
 }
 all<T=Record<string,unknown>>(){return this.execute<T>();}
 async first<T=Record<string,unknown>>(){return (await this.execute<T>()).results[0]??null;}
 run(){return this.execute<Record<string,unknown>>();}
}
export function database(){return {prepare:(sql:string)=>new Statement(sql)};}
