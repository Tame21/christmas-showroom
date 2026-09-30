import { z } from 'zod';
export const productInput=z.object({
 name:z.string().trim().min(1,'请输入产品名称').max(100),
 model:z.string().trim().min(1,'请输入型号').max(40).transform(v=>v.toUpperCase()),
 category:z.string().trim().min(1,'请输入系列').max(30),
 height:z.number().positive('高度需大于0').max(2000),
 width:z.number().positive('宽度需大于0').max(2000),
 material:z.string().trim().min(1,'请输入材质').max(100),
 lighting:z.string().trim().max(100),
 subtitle:z.string().trim().max(100),
 description:z.string().trim().max(5000),
 images:z.array(z.string().regex(/^\/(?:images\/(?:classic|snow|gold)\.png|api\/media\/[a-f0-9-]{36}\.(?:jpg|png|webp))$/,'请上传有效图片')).min(1,'至少上传一张产品图片').max(10),
 published:z.boolean(),demo:z.boolean(),sortOrder:z.number().int().min(0).max(9999)
});
export type ProductInput=z.infer<typeof productInput>;
export type Product=ProductInput & {id:string;updatedAt:string};
export const demoProducts:Product[]=[
 {id:'demo-1',name:'诺德曼 · 经典绿圣诞树',model:'FL-ND180',category:'经典绿树',height:180,width:110,material:'PE + PVC 混合松针',lighting:'不含灯饰',subtitle:'自然松针，留住森林的温度。',description:'丰盈的绿色枝叶与舒展树形，还原自然松树的层次。可自由搭配灯串、挂饰与树裙，为客厅、门店或橱窗布置节日氛围。\\n示例规格与图片仅用于演示，请以实际产品为准。',images:['/images/classic.png'],published:true,demo:true,sortOrder:1,updatedAt:'2026-09-28T00:00:00.000Z'},
 {id:'demo-2',name:'初雪 · 雪绒灯光圣诞树',model:'FL-SN210',category:'植绒雪树',height:210,width:130,material:'PE + PVC / 仿雪植绒',lighting:'暖白色 LED 灯串',subtitle:'雪落枝头，点亮冬日的浪漫。',description:'轻盈雪绒覆盖层层枝梢，暖白色灯光在枝叶间柔和闪烁。白与绿相映，适合营造安静温暖的冬日空间。\\n示例规格与图片仅用于演示，请以实际产品为准。',images:['/images/snow.png'],published:true,demo:true,sortOrder:2,updatedAt:'2026-09-28T00:00:00.000Z'},
 {id:'demo-3',name:'鎏金 · 圣诞装饰成品树',model:'FL-GD180',category:'装饰成品树',height:180,width:120,material:'PE + PVC / 金属树架',lighting:'暖白色 LED 灯串',subtitle:'酒红与暖金，刚刚好的节日仪式。',description:'酒红色饰球与香槟金装饰点缀浓绿枝叶，搭配温暖灯光。丰富而协调的层次，为节日聚会与商业空间带来经典圣诞色彩。\\n示例规格与图片仅用于演示，请以实际产品为准。',images:['/images/gold.png'],published:true,demo:true,sortOrder:3,updatedAt:'2026-09-28T00:00:00.000Z'}
];