import { Button } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

import GoogleIcon from '@/assets/google.webp'
import { testLoginOptions } from '@/shared/api/test.saml.login'
import { authTokenAtom } from '@/features/auth/atoms'
import { loginUrl } from '@/shared/api/login'

export const Route = createFileRoute('/_un-auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { mutate: testLogin, isPending } = useMutation({
    ...testLoginOptions(),
    onSuccess: (response) => {
      setAuthToken(response.data.token)
      navigate({ to: '/', replace: true })
    },
  })
  const setAuthToken = useSetAtom(authTokenAtom)

  const [isRedirecting, setIsRedirecting] = useState(false)

  const isLoading = isPending || isRedirecting

  const handleLogin = () => {
    if (import.meta.env.MODE === 'development') {
      testLogin()
      return
    }

    setIsRedirecting(true)
    window.location.assign(loginUrl)
  }

  return (
    <div className="bg-background-default flex h-dvh w-dvw items-center justify-center">
      <div className="bg-background-default flex w-full max-w-md flex-col items-center rounded-xl p-8">
        <div className="mb-6 flex items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="size-6" />
          <h1 className="text-xl font-bold">Sandbox</h1>
        </div>
        <h2 className="text-primary text-2xl font-bold">Hi, Welcome back!</h2>
        <p className="text-text-secondary mb-8 text-sm">
          Sign in to your IKG account
        </p>
        <Button
          className="capitalize"
          variant="outlined"
          size="large"
          startIcon={
            <img
              src={GoogleIcon}
              alt="google"
              className="inline-block size-4"
            />
          }
          loading={isLoading}
          onClick={handleLogin}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
