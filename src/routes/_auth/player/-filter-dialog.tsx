import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useStore } from '@tanstack/react-form'

import { Form } from '@/shared/ui/form'
import { getBrandsOptions } from '@/shared/api/service.sandbox.brands'
import { withForm } from '@/shared/form/hooks'

import type { SearchFormType } from './-schemas'

type FilterDialogProps = {
  open: boolean
}

export const FilterDialog = withForm({
  defaultValues: {} as SearchFormType,
  props: {} as FilterDialogProps,
  render: function FilterDialog({ form, open }) {
    const { data: brands, isLoading: isBrandsLoading } = useQuery({
      ...getBrandsOptions({
        limit: 1000,
        offset: 0,
      }),
      staleTime: 30_000,
      enabled: open,
    })
    const operatorCode = useStore(
      form.store,
      (state) => state.values.operatorCode,
    )

    const operatorOptions = useMemo(() => {
      return brands
        ? [...new Set(brands.data.list.map((brand) => brand.operatorCode))]
        : []
    }, [brands])

    const brandOptionsMap = useMemo(() => {
      return brands
        ? brands.data.list.reduce<Record<string, string[]>>((acc, brand) => {
            const key = brand.operatorCode
            if (!acc[key]) acc[key] = []
            acc[key].push(brand.brandCode)
            return acc
          }, {})
        : undefined
    }, [brands])

    const brandOptions = useMemo(() => {
      if (typeof brands === 'undefined') {
        return []
      }

      const isOperatorCodeSelected =
        Array.isArray(operatorCode) && operatorCode.length > 0
      if (!isOperatorCodeSelected) {
        return [...new Set(brands.data.list.map((brand) => brand.brandCode))]
      }

      if (typeof brandOptionsMap === 'undefined') {
        return []
      }

      const codes = operatorCode.flatMap((operatorCode) => {
        return brandOptionsMap[operatorCode] ?? []
      })

      return [...new Set(codes)]
    }, [brandOptionsMap, brands, operatorCode])

    const handleReset = () => {
      form.setFieldValue('operatorCode', [])
      form.setFieldValue('brandCode', [])
    }

    return (
      <Dialog open={open} fullWidth closeAfterTransition={false} maxWidth="xs">
        <DialogTitle className="flex items-center gap-2">
          <FilterListIcon className="size-6" /> Filter Player
        </DialogTitle>
        <DialogContent className="pt-2">
          <Form className="flex flex-col gap-6" onSubmit={form.handleSubmit}>
            <form.AppField name="operatorCode">
              {(field) => (
                <field.Select
                  label="Operator Code"
                  multiple
                  loading={isBrandsLoading}
                  options={operatorOptions}
                />
              )}
            </form.AppField>
            <form.AppField name="brandCode">
              {(field) => (
                <field.Select
                  label="Brand Code"
                  multiple
                  loading={isBrandsLoading}
                  options={brandOptions}
                />
              )}
            </form.AppField>

            <DialogActions className="mt-6">
              <Button
                variant="outlined"
                onClick={handleReset}
                type="button"
                size="large"
              >
                Reset
              </Button>
              <Button variant="contained" type="submit" size="large">
                Save
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    )
  },
})
