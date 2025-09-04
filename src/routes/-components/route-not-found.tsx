import { Link, type NotFoundRouteProps } from '@tanstack/react-router'

import { TypographyH1, TypographyP } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'

export function RouteNotFound(_: NotFoundRouteProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <TypographyH1>Not Found</TypographyH1>
      <TypographyP className="mb-4">
        The page you are looking for does not exist.
      </TypographyP>
      <Button className="mb-12" asChild>
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  )
}
