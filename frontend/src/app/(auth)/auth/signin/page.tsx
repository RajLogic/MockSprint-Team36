'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
  <div className='flex min-h-screen bg-[#F2F7F5]'>
     {/* Left side - image */}
     <div className='relative hidden w-1/2 md:block'>
      <img  src="/images/login-image.webp" alt="Login illustration" className="h-full w-full object-cover blur-[1.5px]"/>
      <div className="absolute inset-0 bg-black/20" />
     </div>

      {/* Right side - Signin form */}
  <div className="flex w-full items-center justify-center px-8 md:w-1/2">
    <div className='w-full max-w-sm'>
    <div className="space-y-7">

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 ${manrope.className}">
          Sign in
        </h1>
      </div>

      {/* Google sign in */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#2FAD95]/30"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 0 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>

        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-300" />
        <span className="text-xs font-medium uppercase text-zinc-600">OR</span>
        <div className="h-px flex-1 bg-zinc-300" />
      </div>

      {/* Signup form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email address
          </label>

          <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="example@example.com"
            {...register('email')}
            className="
              h-11 w-full rounded-md border border-zinc-400
              bg-transparent px-3 text-sm text-zinc-800
              placeholder:text-zinc-400
              outline-none transition
              focus:border-[#2FAD95]
              focus:ring-2 focus:ring-[#2FAD95]/20
              aria-invalid:border-red-500
            "
          />

          {errors.email && (
            <p id="email-error" className="text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>

          <input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined} placeholder="Min. 8 Characters" {...register('password')}
            className="
              h-11 w-full rounded-md border border-zinc-400
              bg-transparent px-3 text-sm text-zinc-800
              placeholder:text-zinc-400
              outline-none transition
              focus:border-[#2FAD95]
              focus:ring-2 focus:ring-[#2FAD95]/20
              aria-invalid:border-red-500
            "
          />

          {errors.password && (
            <p id="password-error" className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            h-11 w-full rounded-md
            bg-[#2FA88A] px-4
            text-sm font-medium text-white
            transition-colors
            hover:bg-[#279983]
            focus:outline-none
            focus:ring-2 focus:ring-[#2FAD95]/40
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {/* Register link */}
      <div className="border-t border-zinc-300 pt-5">
        <p className="text-center text-xs text-zinc-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="rounded-md border border-zinc-500 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100">
            Signup 
          </Link>
        </p>
      </div>
    </div>
    </div>
  </div>
  </div>
)
}
