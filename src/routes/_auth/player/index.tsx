import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useStore } from '@tanstack/react-form'
import {
  EyeIcon,
  ListFilterIcon,
  ListFilterPlusIcon,
  PlusIcon,
  SearchIcon,
  SquarePenIcon,
  TrashIcon,
} from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'

import {
  getPlayersOptions,
  playerPayloadSchema,
  playersQueryKey,
} from '@/shared/api/service.sandbox.players'
import { omitEmptyValues } from '@/shared/lib/utils'
import { queryClient } from '@/shared/query/instance'
import { isSameSearch } from '@/shared/api/utils'
import { useAppForm } from '@/shared/form/hooks'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { PageHeading } from '@/shared/ui/page'
import { DataTable } from '@/shared/ui/data-table/data-table'
import { usePlayerListPagination } from '@/shared/ui/data-table/use-pagination'

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
      onBlur: searchFormSchema,
      onSubmit: searchFormSchema,
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
  const columns: ColumnDef<
    NonNullable<typeof players>['data']['list'][number]
  >[] = [
    {
      accessorKey: 'playerExternalId',
      header: 'Player External ID',
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
    },
    {
      accessorKey: 'operatorCode',
      header: 'Operator Code',
    },
    {
      accessorKey: 'brandCode',
      header: 'Brand Code',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                navigate({
                  to: `/player/show/${row.original.playerExternalId}`,
                })
              }}
            >
              <EyeIcon />
            </Button>
            <Button size="icon" variant="ghost">
              <SquarePenIcon />
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon />
            </Button>
          </div>
        )
      },
    },
  ]

  // Pagination
  const { pagination, onPaginationChange } = usePlayerListPagination({
    limit,
    offset,
    onChange: (newPagination) =>
      navigate({
        search: {
          ...searchForm,
          offset: newPagination.pageIndex,
          limit: newPagination.pageSize,
        },
      }),
  })

  return (
    <div data-slot="player-list">
      <PageHeading className="flex items-center justify-between gap-2">
        Player
        <Button>
          Create
          <PlusIcon />
        </Button>
      </PageHeading>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <form.AppForm>
          <div className="flex w-100 max-w-full items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
            >
              {hasFilter ? <ListFilterPlusIcon /> : <ListFilterIcon />}
            </Button>
            <form.Field name="fuzzyId">
              {({ state, handleChange }) => (
                <Input
                  className="grow px-3"
                  placeholder="Player External ID (fuzzy)"
                  value={state.value ?? ''}
                  onChange={(e) => {
                    handleChange(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      form.handleSubmit()
                    }
                  }}
                  tabIndex={0}
                />
              )}
            </form.Field>

            <form.SubmitButton size="icon" variant="outline">
              <SearchIcon />
            </form.SubmitButton>
            <FilterDialog
              form={form}
              open={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
        </form.AppForm>
      </div>
      <DataTable
        loading={isFetching}
        columns={columns}
        data={players?.data.list}
        rowCount={players?.data.totalCount ?? 0}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  )
}
