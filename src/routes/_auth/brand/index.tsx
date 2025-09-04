import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/brand/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/brand"!</div>
}
