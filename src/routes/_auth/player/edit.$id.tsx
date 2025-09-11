import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

import { getPlayersOptions } from '@/shared/api/service.sandbox.players'
import { putPlayersOptions } from '@/shared/api/service.sandbox.players.$playerExternalId'
import { Page, PageBackButton, PageHeading } from '@/shared/ui/page'
import { useAppForm } from '@/shared/form/hooks'
import { Card, CardContent, CardFooter } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Loading } from '@/shared/ui/loading'
import { getOperatorCodesOptions } from '@/shared/api/service.sandbox.operator-codes'

import { putPlayerSchema } from './-schemas'

export const Route = createFileRoute('/_auth/player/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: player, isFetching } = useQuery({
    ...getPlayersOptions({ playerExternalId: [id], limit: 1, offset: 0 }),
    select: (data) => data.data.list[0],
  })

  const { data: operatorCodes } = useQuery(getOperatorCodesOptions())
  const operatorCodesOptions = useMemo(() => {
    return (
      operatorCodes?.data.map((operatorCode) => ({
        value: operatorCode,
        label: operatorCode,
      })) ?? []
    )
  }, [operatorCodes])

  const { mutate: putPlayer } = useMutation({
    ...putPlayersOptions(),
    onSuccess: () => {
      // TODO: toast
    },
  })

  // Form
  const form = useAppForm({
    defaultValues: putPlayerSchema.parse(player),
    validators: {
      onBlur: putPlayerSchema,
      onSubmit: putPlayerSchema,
    },
    onSubmit: (data) => {
      console.log(data)
      // setIsFilterOpen(false)
      // const newSearch = omitEmptyValues({
      //   ...data.value,
      //   limit,
      //   offset: 0,
      // })
      // navigate({
      //   search: newSearch,
      // })
      // const oldSearch = { ...searchForm, limit, offset }
      // if (isSameSearch(newSearch, oldSearch)) {
      //   queryClient.invalidateQueries({
      //     queryKey: playersQueryKey,
      //   })
      // }
    },
  })

  const isPageLoading = isFetching

  console.log(form.state.errors)

  return (
    <Page dataSlot="player-edit" className="mx-auto max-w-xl">
      <PageHeading className="mb-8 flex items-center gap-2">
        <PageBackButton />
        {isPageLoading ? (
          <Skeleton className="w-30">.</Skeleton>
        ) : (
          (player?.playerExternalId ?? '-')
        )}
      </PageHeading>
      <Card className="relative">
        {isPageLoading && (
          <CardContent className="absolute inset-0 z-10 size-full">
            <Loading className="bg-background/80" />
          </CardContent>
        )}
        <CardContent className="flex flex-col gap-6">
          <form.AppField name="playerExternalId">
            {(field) => (
              <field.Input disabled required label="Player External ID" />
            )}
          </form.AppField>
          <form.AppField name="balance">
            {(field) => <field.Input required label="Balance" />}
          </form.AppField>
          <form.AppField name="lastCurrency">
            {(field) => <field.Input required label="Currency" />}
          </form.AppField>
          <form.AppField name="operatorCode">
            {(field) => (
              <field.Select
                required
                label="Operator Code"
                options={operatorCodesOptions}
              />
            )}
          </form.AppField>
          <form.AppField name="brandCode">
            {(field) => (
              <field.Select required label="Brand Code" options={[]} />
            )}
          </form.AppField>
          <form.AppField name="jurisdictionCode">
            {(field) => <field.Input label="Jurisdiction Code" />}
          </form.AppField>
          <form.AppField name="country">
            {(field) => <field.Input label="Country" />}
          </form.AppField>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-4">
          <form.AppForm>
            <form.ResetButton>Reset</form.ResetButton>
            <form.SubmitButton>Save</form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </Card>
    </Page>
  )
}
