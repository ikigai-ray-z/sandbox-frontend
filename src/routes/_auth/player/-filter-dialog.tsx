import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useStore } from '@tanstack/react-form'
import { ListFilterIcon } from 'lucide-react'

import { getBrandsOptions } from '@/shared/api/service.sandbox.brands'
import { withForm } from '@/shared/form/hooks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import type { SearchFormType } from './-schemas'

type FilterDialogProps = {
  open: boolean
  setIsFilterOpen: (open: boolean) => void
}

export const FilterDialog = withForm({
  defaultValues: {} as SearchFormType,
  props: {} as FilterDialogProps,
  render: function FilterDialog({ form, open, setIsFilterOpen }) {
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
        ? [...new Set(brands.data.list.map((brand) => brand.operatorCode))].map(
            (operatorCode) => ({
              value: operatorCode,
              label: operatorCode,
            }),
          )
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
        return [
          ...new Set(brands.data.list.map((brand) => brand.brandCode)),
        ].map((brandCode) => ({
          value: brandCode,
          label: brandCode,
        }))
      }

      if (typeof brandOptionsMap === 'undefined') {
        return []
      }

      const codes = operatorCode.flatMap((operatorCode) => {
        return brandOptionsMap[operatorCode] ?? []
      })

      return [...new Set(codes)].map((brandCode) => ({
        value: brandCode,
        label: brandCode,
      }))
    }, [brandOptionsMap, brands, operatorCode])

    const handleReset = () => {
      form.setFieldValue('operatorCode', [])
      form.setFieldValue('brandCode', [])
    }

    return (
      <Dialog open={open} onOpenChange={setIsFilterOpen}>
        <DialogContent className="gap-10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <ListFilterIcon className="size-6" />
              <span>Filter Player</span>
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <form.AppField name="operatorCode">
              {(field) => (
                <field.Select
                  label="Operator Code"
                  multiple
                  loading={isBrandsLoading}
                  options={operatorOptions}
                  onChange={() => form.setFieldValue('brandCode', undefined)}
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
          </div>
          <DialogFooter>
            <form.AppForm>
              <form.ResetButton onClick={handleReset}>Reset</form.ResetButton>
              <form.SubmitButton>Save</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
})
