import { authorize,apiError,ApiError } from '@/lib/auth';
import { createProduct,listProducts } from '@/lib/data';
import { productInput } from '@/lib/products';
export const dynamic='force-dynamic';
export async function GET(){try{await authorize();return Response.json({products:await listProducts(true)},{headers:{'Cache-Control':'no-store'}});}catch(e){return apiError(e);}}
export async function POST(req:Request){try{await authorize(req);if(Number(req.headers.get('content-length'))>50000)throw new ApiError('产品信息过大。',413);const parsed=productInput.safeParse(await req.json());if(!parsed.success)throw new ApiError(parsed.error.issues[0].message);const product={...parsed.data,id:crypto.randomUUID(),updatedAt:new Date().toISOString()};await createProduct(product);return Response.json({product},{status:201});}catch(e){return apiError(e);}}
