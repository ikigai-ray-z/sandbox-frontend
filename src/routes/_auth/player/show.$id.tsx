import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { getPlayersOptions } from '@/shared/api/service.sandbox.players'
import { Page, PageBackButton, PageHeading } from '@/shared/ui/page'
import { SingleColumnTable } from '@/shared/ui/single-column-table'
import { Skeleton } from '@/shared/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export const Route = createFileRoute('/_auth/player/show/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: player, isFetching } = useQuery({
    ...getPlayersOptions({ playerExternalId: [id], limit: 1, offset: 0 }),
    select: (data) => data.data.list[0],
  })

  const descriptionList = [
    {
      id: 'playerExternalId',
      key: 'Player External ID',
      value: player?.playerExternalId,
    },
    {
      id: 'balance',
      key: 'Balance',
      value: player?.balance,
    },
    {
      id: 'currency',
      key: 'Currency',
      value: player?.lastCurrency,
    },
    {
      id: 'operatorCode',
      key: 'Operator Code',
      value: player?.operatorCode,
    },
    {
      id: 'brandCode',
      key: 'Brand Code',
      value: player?.brandCode,
    },
    {
      id: 'jurisdictionCode',
      key: 'Jurisdiction Code',
      value: player?.jurisdictionCode,
    },
    {
      id: 'country',
      key: 'Country',
      value: player?.country,
    },
  ]

  if (isFetching) {
    return (
      <Page dataSlot="player-show" className="mx-auto max-w-xl">
        <PageHeading className="mb-8 flex items-center gap-2">
          <PageBackButton />
          <Skeleton className="w-30">.</Skeleton>
        </PageHeading>
        <Card>
          <CardHeader>
            <Skeleton className="w-30">
              <CardTitle>.</CardTitle>
            </Skeleton>
          </CardHeader>
          <CardContent>
            <Skeleton>
              <SingleColumnTable
                items={descriptionList}
                className="-mx-2 border-0"
              />
            </Skeleton>
          </CardContent>
        </Card>
      </Page>
    )
  }

  return (
    <Page dataSlot="player-show" className="mx-auto max-w-xl">
      <PageHeading className="mb-8 flex items-center gap-2">
        <PageBackButton />
        {player?.playerExternalId ?? '-'}
      </PageHeading>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SingleColumnTable
            items={descriptionList}
            className="-mx-2 border-0"
          />
        </CardContent>
      </Card>
    </Page>
  )
}
