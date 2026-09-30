import { authorize,apiError,ApiError } from '@/lib/auth';
import { database,getProduct,updateProduct } from '@/lib/data';
import { productInput } from '@/lib/products';
export const dynamic='force-dynamic';
type Context={params:Promise<{id:string}>};
export async function PUT(req:Request,{params}:Context){try{await authorize(req);const {id}=await params;if(!await getProduct(id,true))throw new ApiError('产品不存在或已删除。',404);const parsed=productInput.safeParse(await req.json());if(!parsed.success)throw new ApiError(parsed.error.issues[0].message);const product={...parsed.data,id,updatedAt:new Date().toISOString()};await updateProduct(product);return Response.json({product});}catch(e){return apiError(e);}}
export async function DELETE(req:Request,{params}:Context){try{await authorize(req);const {id}=await params;const r=await database().prepare('DELETE FROM products WHERE id=?').bind(id).run();if(!r.meta.changes)throw new ApiError('产品不存在或已删除。',404);return Response.json({deleted:id});}catch(e){return apiError(e);}}
