import { type NotFoundRouteProps } from '@tanstack/react-router'

export function NotFound(_: NotFoundRouteProps) {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}
