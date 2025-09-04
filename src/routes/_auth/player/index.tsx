import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  GridActionsCellItem,
  type GridColDef,
  type GridPaginationModel,
  type GridRowModel,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useStore } from '@tanstack/react-form'
import { SearchIcon, SlidersHorizontal } from 'lucide-react'

import {
  getPlayersOptions,
  playerPayloadSchema,
  playersQueryKey,
} from '@/shared/api/service.sandbox.players'
import {
  convertToMuiPagination,
  Table,
  getPaginationChange,
} from '@/shared/ui/table'
import { Form } from '@/shared/ui/form'
import { cn, omitEmptyValues } from '@/shared/lib/utils'
import { DeleteAction } from '@/shared/ui/table/delete-action'
import { ShowAction } from '@/shared/ui/table/show-action'
import { queryClient } from '@/shared/query/instance'
import { defaultPageSizeOptions } from '@/shared/ui/table/constants'
import { isSameSearch } from '@/shared/api/utils'
import { useAppForm } from '@/shared/form/hooks'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

import { FilterDialog } from './-filter-dialog'
import { searchFormSchema } from './-schemas'

export const Route = createFileRoute('/_auth/player/')({
  validateSearch: playerPayloadSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { limit, offset, ...searchForm } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  // Dialog
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Query
  const { data: players, isFetching } = useQuery({
    ...getPlayersOptions({
      ...searchForm,
      limit,
      offset,
    }),
    placeholderData: keepPreviousData,
  })

  // Form
  const form = useAppForm({
    defaultValues: searchForm,
    validators: {
      onChange: searchFormSchema,
    },
    onSubmit: (data) => {
      setIsFilterOpen(false)

      const newSearch = omitEmptyValues({
        ...data.value,
        limit,
        offset: 0,
      })

      navigate({
        search: newSearch,
      })

      const oldSearch = { ...searchForm, limit, offset }
      if (isSameSearch(newSearch, oldSearch)) {
        queryClient.invalidateQueries({
          queryKey: playersQueryKey,
        })
      }
    },
  })

  const hasFilter = useStore(form.store, (state) => {
    return (
      (state.values?.operatorCode?.length ?? 0) > 0 ||
      (state.values?.brandCode?.length ?? 0) > 0
    )
  })

  // Form Error (for debugging)
  useEffect(() => {
    const errors = form.state.errors
    if (Object.keys(errors).length > 0) {
      console.warn('Form errors:', errors)
    }
  }, [form.state.errors])

  // Table
  const columns: GridColDef[] = [
    {
      field: 'playerExternalId',
      headerName: 'Player External ID',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'balance',
      headerName: 'Balance',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'operatorCode',
      headerName: 'Operator Code',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'brandCode',
      headerName: 'Brand Code',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 140,
      getActions: (params) => [
        <ShowAction
          key={params.id}
          onClick={() => {
            navigate({
              to: `/player/show/${params.row.playerExternalId}`,
            })
          }}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {}}
        />,
        <DeleteAction key={params.id} onClick={() => {}} />,
      ],
    },
  ]

  const rows: GridRowModel[] =
    players?.data.list.map((item) => ({
      id: item.playerExternalId,
      playerExternalId: item.playerExternalId,
      balance: item.balance,
      currency: item.lastCurrency,
      operatorCode: item.operatorCode,
      brandCode: item.brandCode,
    })) ?? []

  // Pagination
  const paginationModel = convertToMuiPagination({ offset, limit })
  const onPaginationModelChange = (model: GridPaginationModel) => {
    const newValue = getPaginationChange({
      model,
      limit,
      offset,
    })

    if (newValue) {
      navigate({
        search: newValue,
      })
    }
  }

  return (
    <>
      <div data-slot="player-list">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Form
            className="flex w-100 max-w-full items-center gap-2"
            onSubmit={form.handleSubmit}
          >
            <form.Field name="fuzzyId">
              {({ state, handleChange }) => (
                <Input
                  className="grow px-3"
                  placeholder="Player External ID (fuzzy)"
                  value={state.value ?? ''}
                  onChange={(e) => {
                    handleChange(e.target.value)
                  }}
                />
              )}
            </form.Field>

            <Button type="submit" size="icon" variant="outline">
              <SearchIcon />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
            >
              <SlidersHorizontal className={cn(hasFilter && 'text-primary')} />
            </Button>
          </Form>
          <Button className="ms-auto">Create</Button>
        </div>
        <Table
          loading={isFetching}
          rows={rows}
          columns={columns}
          pageSizeOptions={defaultPageSizeOptions}
          paginationModel={paginationModel}
          rowCount={players?.data.totalCount}
          onPaginationModelChange={onPaginationModelChange}
        />
      </div>
      <FilterDialog open={isFilterOpen} form={form} />
    </>
  )
}
