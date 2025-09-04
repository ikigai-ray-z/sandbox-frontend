import { Select } from '@/shared/ui/form/select'

import { useFieldContext } from './contexts'

type SelectFieldProps = {
  multiple: boolean
  loading: boolean
  label: string
  options: string[]
}
export function SelectField({
  multiple,
  loading,
  label,
  options,
}: SelectFieldProps) {
  const field = useFieldContext()
  const fieldValue = field.state.value

  const value = (() => {
    if (multiple) {
      return Array.isArray(fieldValue) && fieldValue.length > 0
        ? fieldValue
        : []
    } else {
      return fieldValue ?? null
    }
  })()

  return (
    <Select
      label={label}
      multiple={multiple}
      loading={loading}
      options={options}
      value={value}
      onChange={(_, value) => field.handleChange(value)}
      onBlur={field.handleBlur}
    />
  )
}
