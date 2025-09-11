import { useId } from 'react'

import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'

import { useFieldContext } from './contexts'

type InputFieldProps = {
  required?: boolean
  disabled?: boolean
  label: string
  onChange?: (value: string) => void
}
export function InputField({
  required = false,
  disabled = false,
  label,
  onChange,
}: InputFieldProps) {
  const id = useId()
  const field = useFieldContext<string | undefined>()
  const fieldValue = field.state.value

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive text-xs">*</span>}
      </Label>
      <Input
        id={id}
        disabled={disabled}
        value={fieldValue}
        onChange={(e) => {
          field.handleChange(e.target.value)
          onChange?.(e.target.value)
        }}
      />
    </div>
  )
}
