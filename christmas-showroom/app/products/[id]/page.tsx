import { Header,Footer } from '@/components/site-chrome';
import { Gallery } from '@/components/gallery';
import { getProduct } from '@/lib/data';
import { adminUser } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { ChevronLeft, Ruler, Layers, Lightbulb } from 'lucide-react';
export const dynamic='force-dynamic';
export default async function Detail({params}:{params:Promise<{id:string}>}){const {id}=await params;let p;try{p=await getProduct(id,!!await adminUser());}catch{return <><Header/><main className="state-page"><h1>产品暂时无法加载</h1><p>请稍后重试。</p><a className="primary-button" href={'/products/'+id}>重新加载</a></main></>;}if(!p)notFound();
return <><Header/><main className="detail-page"><a href="/" className="back-link"><ChevronLeft size={16}/>返回产品展厅</a><div className="detail-grid"><Gallery images={p.images} name={p.name}/><div className="detail-info"><p className="eyebrow">FULY / {p.category}</p><h1>{p.name}</h1><p className="detail-model">{p.model}</p><p className="detail-subtitle">{p.subtitle}</p>{!p.published&&<p className="notice">此产品已下架，仅管理员可见。</p>}<div className="feature-row"><span><Ruler size={20}/>{p.height} cm 高度</span><span><Layers size={20}/>{p.category}</span><span><Lightbulb size={20}/>{p.lighting||'未注明灯光'}</span></div><section><h2>产品规格<span>SPECIFICATIONS</span></h2><dl className="specifications">{[['产品名称',p.name],['产品型号',p.model],['高度',p.height+' cm'],['最大宽度',p.width+' cm'],['材质',p.material],['灯光配置',p.lighting||'未注明'],['产品系列',p.category]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></section><section className="product-description"><h2>产品介绍<span>THE DETAILS</span></h2><p>{p.description||'暂无补充介绍。'}</p></section>{p.demo&&<p className="notice">示例展品 · 图片由 AI 生成，名称与规格仅供演示。</p>}</div></div></main><Footer/></>;}
