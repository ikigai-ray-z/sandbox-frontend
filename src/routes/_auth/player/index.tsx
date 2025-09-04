import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  GridActionsCellItem,
  type GridColDef,
  type GridPaginationModel,
  type GridRowModel,
} from '@mui/x-data-grid'
import { Badge, Button, Divider, IconButton, InputBase } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useStore } from '@tanstack/react-form'

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
      <div className="flex h-full flex-col pb-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Form
            className="border-divider flex w-100 max-w-full items-center rounded-md border"
            onSubmit={form.handleSubmit}
          >
            <form.Field name="fuzzyId">
              {({ state, handleChange }) => (
                <InputBase
                  className="grow px-3"
                  placeholder="Player External ID (fuzzy)"
                  value={state.value ?? ''}
                  onChange={(e) => {
                    handleChange(e.target.value)
                  }}
                />
              )}
            </form.Field>

            <IconButton className="mx-1" type="submit">
              <SearchTwoToneIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton className="mx-1" onClick={() => setIsFilterOpen(true)}>
              <Badge color="primary" variant="dot" invisible={!hasFilter}>
                <FilterListIcon className={cn(hasFilter && 'text-primary')} />
              </Badge>
            </IconButton>
          </Form>
          <Button
            variant="contained"
            className="ms-auto"
            startIcon={<AddIcon />}
          >
            Create
          </Button>
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
