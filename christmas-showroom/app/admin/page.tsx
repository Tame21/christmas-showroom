import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { adminUser } from '@/lib/auth';
import { listProducts } from '@/lib/data';
import { Header,Footer } from '@/components/site-chrome';
import { Admin } from '@/components/admin';
export const dynamic='force-dynamic';
export default async function AdminPage(){await requireChatGPTUser('/admin');try{const user=await adminUser();if(!user)return <><Header admin/><main className="state-page"><h1>此账号没有管理权限</h1><p>请使用网站所有者的 ChatGPT 账号登录。</p><a className="primary-button" href="/signout-with-chatgpt?return_to=%2Fadmin" target="_top">切换登录账号</a></main><Footer/></>;return <><Header admin/><Admin initialProducts={await listProducts(true)} displayName={user.displayName}/><Footer/></>;}catch(e){console.error('Admin unavailable',e);return <><Header admin/><main className="state-page"><h1>后台暂时无法加载</h1><p>请稍后重试，已有产品信息会保留。</p><a className="primary-button" href="/admin">重新加载</a></main></>;}}
