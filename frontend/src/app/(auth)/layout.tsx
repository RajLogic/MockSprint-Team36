import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Authentication',
}

const inter = Inter({
  subsets: ['latin']
})

const manrope = Manrope({
  subsets: ['latin']
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
    //   <div className="w-full max-w-sm">{children}</div>
    // </div>
    <main className='min-h-screen w-full'>
      {children}
    </main>
  )
}
