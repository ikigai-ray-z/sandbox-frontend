import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { List, ListItem, ListItemText } from '@mui/material'

import { getPlayersOptions } from '@/shared/api/service.sandbox.players'

export const Route = createFileRoute('/_auth/player/show/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: player } = useQuery({
    ...getPlayersOptions({ playerExternalId: [id], limit: 1, offset: 0 }),
    select: (data) => data.data.list[0],
  })

  const descriptionList = [
    {
      key: 'playerExternalId',
      label: 'Player External ID',
      value: player?.playerExternalId,
    },
  ]

  return (
    <div>
      <List>
        <ListItem>
          <ListItemText
            primary="Player External ID"
            secondary={player?.playerExternalId}
          />
        </ListItem>
      </List>
    </div>
  )
}
