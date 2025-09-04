import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/operator/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/operator/create"!</div>
}
