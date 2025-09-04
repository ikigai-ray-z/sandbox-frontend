import { Container } from '@mui/material'
import { Link, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

interface Props {
  className?: string
  children: React.ReactNode
}
export function Main({ className, children }: Props) {
  const matches = useMatches()

  const pathname = matches.at(-1)?.pathname
  const pathnameList =
    typeof pathname === 'string'
      ? pathname
          .split('/')
          .map((item, index) => (item === '' && index === 0 ? '/' : item))
          .filter(Boolean)
      : []

  const title = (() => {
    const title = pathnameList.at(-1)
    return title ? title.charAt(0).toUpperCase() + title.slice(1) : '-'
  })()

  return (
    <main className={className}>
      <Container className="flex min-h-full flex-col">
        <h1 className="mb-2 shrink-0 text-3xl font-bold">{title}</h1>
        <ul className="mb-4 flex shrink-0 items-center gap-2">
          {pathnameList.map((pathname, index, array) => (
            <Fragment key={index}>
              {pathname === array.at(-1) ? (
                <span className="text-text-disabled text-sm">{pathname}</span>
              ) : (
                <>
                  <Link
                    to={pathname}
                    className="text-text-primary text-xs hover:underline"
                  >
                    {pathname === '/' ? (
                      <HomeRoundedIcon className="size-4" />
                    ) : (
                      pathname
                    )}
                  </Link>
                  <span className="text-text-disabled text-sm">/</span>
                </>
              )}
            </Fragment>
          ))}
        </ul>
        <article className="h-0 grow">{children}</article>
      </Container>
    </main>
  )
}
