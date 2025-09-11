import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

import GoogleIcon from '@/assets/google.webp'
import { testLoginOptions } from '@/shared/api/test.saml.login'
import { authTokenAtom } from '@/features/auth'
import { loginUrl } from '@/shared/api/exp.saml.login'
import { Card, CardContent, CardFooter } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Page } from '@/shared/ui/page'

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

  const appVersion = `v ${__APP_VERSION__}`

  const handleLogin = () => {
    if (import.meta.env.MODE === 'development') {
      testLogin()
      return
    }

    setIsRedirecting(true)
    window.location.assign(loginUrl)
  }

  return (
    <Page
      dataSlot="sign-in"
      className="flex h-full w-full items-center justify-center px-4"
    >
      <div className="flex h-full w-full max-w-100 flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="size-6" />
          <h1 className="text-xl font-bold">Sandbox</h1>
        </div>
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center">
            <h2 className="text-primary mb-2 text-2xl font-semibold">
              Hi, Welcome back!
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Sign in to your IKG account
            </p>
            <Button size="lg" disabled={isLoading} onClick={handleLogin}>
              <img src={GoogleIcon} alt="google" className="block size-4" />
              <span>Sign in with Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <span className="text-muted-foreground text-xs">{appVersion}</span>
          </CardFooter>
        </Card>
      </div>
    </Page>
  )
}
