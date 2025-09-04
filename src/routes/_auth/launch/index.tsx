import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/launch/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/launch"!</div>
}
