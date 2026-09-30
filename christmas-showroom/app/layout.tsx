import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
export const metadata: Metadata = { title: 'fuly圣诞树 · 产品展厅', description:'探索fuly圣诞树系列，查看产品型号、尺寸与高清细节。', icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="zh-CN"><body>{children}<Toaster position="top-center" richColors/></body></html>;}