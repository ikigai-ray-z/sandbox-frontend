import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { TypographyH1, TypographyP } from '@/shared/ui/typography'

type Props = {
  error: Error
}

export function CustomError({ error }: Props) {
  console.error(error)
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <TypographyH1>Oops!</TypographyH1>
      <TypographyP className="mb-4">Something went wrong</TypographyP>
      <Button className="mb-12" asChild>
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  )
}
