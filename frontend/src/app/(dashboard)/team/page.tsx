import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import { adminDb } from '@/lib/firebase/admin'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Team Page',
}

export default async function TeamPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  const profileSnap = await adminDb.collection('users').doc(session.uid).get()

  const displayName = profileSnap?.exists
    ? (profileSnap.data()?.displayName as string | null)
    : null

  const greetingName = displayName ?? session?.email ?? null


  const teamMembers = [
    { name: 'Sean Renzo Mojica', role: 'Developer' , description: 'Build the solution, code, architecture, testing, and deployment'},
    { name: 'Phuong Vo Nguyen', role: 'Developer' , description: 'Build the solution, code, architecture, testing, and deployment'},
    { name: 'Johanne Vanness Gutierrez', role: 'Project Manager' , description: 'Coordinate timelines, manage the team, and keep the project on track'},
    { name: 'Rajvansh Singh Padda', role: ' UX Designer', description: 'Design user flows, wireframes, and prototypes for intuitive experiences'},
    { name: 'Ethan Dalianis', role: 'Business Analyst', description: 'Define requirements, analyse stakeholder needs, and bridge business with tech' },
  ]

 
    return (
  <div>
    <h1 className="mb-2 text-4xl font-bold text-center">Team 36</h1>
    <p className="mb-6 text-center">The Team behind the Project</p>

    <div className="mt-30 grid gap-4 md:grid-cols-2 lg:grid-cols-5 text-center space">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="flex h-full flex-col rounded-lg border border-zinc-200 bg-[#D9D9D9] p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800"
        >
          <Image
            src="/images/profile.png"
            alt={member.name}
            width={150}
            height={150}
            className="mx-auto mb-4 h-30 w-30 rounded-full object-cover"
          />
          <div className="flex flex-1 flex-col space-y-4">
            <div className="space-y-1">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm">{member.role}</p>
            </div>
            <p className="text-sm">{member.description}</p>
            <button className="mt-auto mx-auto w-24 rounded-lg bg-[#2FA88A] px-4 py-2 font-medium text-white transition hover:bg-green-400">
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
  
}