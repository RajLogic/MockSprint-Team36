import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import { adminDb } from '@/lib/firebase/admin'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const profileSnap = session ? await adminDb.collection('users').doc(session.uid).get() : null

  const displayName = profileSnap?.exists
    ? (profileSnap.data()?.displayName as string | null)
    : null
  const greetingName = displayName ?? session?.email ?? null
return (
  <div className="space-y-8">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold">Team 36</h1>
      <p className="mt-2 text-lg text-zinc-500">
        the Team Behind the Project
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {(['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4', 'Team Member 5'] as const).map((title) => (
        <div
          key={title}
          className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-sm font-medium text-zinc-500">{title}</p>
       
        </div>
      ))}
    </div>
  </div>
)
}
