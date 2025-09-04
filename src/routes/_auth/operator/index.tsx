import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/operator/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/operator"!</div>
}
