import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { database } from './data';
export async function adminUser(){
 const user=await getChatGPTUser();if(!user)return null;
 const local=import.meta.env.DEV && user.userId==='local_seedy' && user.email==='seedy@sites.test';
 const db=database();let identity=await db.prepare("SELECT user_id FROM admin_identity WHERE id='owner'").first<{user_id:string}>();
 if(!identity){const email=(env as unknown as {ADMIN_EMAIL?:string}).ADMIN_EMAIL;if(!local && (!email || user.email.toLowerCase()!==email.toLowerCase()))return null;await db.prepare("INSERT OR IGNORE INTO admin_identity (id,user_id) VALUES ('owner',?)").bind(user.userId).run();identity=await db.prepare("SELECT user_id FROM admin_identity WHERE id='owner'").first<{user_id:string}>();}
 return identity?.user_id===user.userId?user:null;
}
export function verifyOrigin(request:Request){if(request.headers.get('origin')!==new URL(request.url).origin || request.headers.get('sec-fetch-site')==='cross-site')throw new ApiError('请求来源无效，请刷新页面重试。',403);}
export class ApiError extends Error{constructor(message:string,public status=400){super(message);}}
export async function authorize(request?:Request){if(request)verifyOrigin(request);if(!await adminUser())throw new ApiError('请使用管理员账号登录。',403);}
export function apiError(error:unknown){if(error instanceof ApiError)return Response.json({error:error.message},{status:error.status});console.error('Product operation failed',error);if(String(error).includes('UNIQUE constraint'))return Response.json({error:'此产品型号已存在，请使用不同型号。'},{status:409});return Response.json({error:'暂时无法完成操作，请稍后重试。已填写的内容会保留。'},{status:503});}
