import { Link } from '@/shared/ui/link'

type Props = {
  error: Error
}

export function RouteError({ error }: Props) {
  console.error(error)
  return (
    <div className="my-4">
      <div className="mb-4 text-4xl font-bold">Oops!</div>
      <div className="mb-8 text-xl font-medium">Something went wrong</div>
      <Link to="/" color="primary" variant="contained" size="small">
        Go to home
      </Link>
    </div>
  )
}
