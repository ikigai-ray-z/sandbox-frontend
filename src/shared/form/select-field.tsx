import { useId, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  LoaderCircleIcon,
  XIcon,
} from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command'
import { Label } from '@/shared/ui/label'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

import { useFieldContext } from './contexts'

type SelectFieldProps = {
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  loading?: boolean
  label: string
  options: { value: string; label: string }[]
  onChange?: (value: string | string[] | undefined) => void
}
export function SelectField({
  multiple = false,
  required = false,
  disabled = false,
  loading = false,
  label,
  options,
  onChange,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const field = useFieldContext<string | string[] | null | undefined>()
  const fieldValue = field.state.value

  const hasValue = (() => {
    if (multiple) {
      return Array.isArray(fieldValue) && fieldValue.length > 0
    }
    return !!fieldValue
  })()

  const getBadge = () => {
    if (Array.isArray(fieldValue) && fieldValue.length > 0) {
      return fieldValue.map((value) => (
        <Badge key={value} variant="secondary">
          {value}
        </Badge>
      ))
    }

    const value = options.find((option) => option.value === fieldValue)?.label
    if (value) {
      return <span className="text-muted-foreground text-sm">{value}</span>
    }
    return <span className="text-muted-foreground text-sm">Choose Item...</span>
  }

  const onSelect = (value: string) => {
    onChange?.(value)
    if (multiple && Array.isArray(fieldValue)) {
      const valueSet = new Set(fieldValue)
      if (valueSet.has(value)) {
        valueSet.delete(value)
        field.handleChange([...valueSet])
        return
      }
      valueSet.add(value)
      field.handleChange([...valueSet])
      return
    }
    if (multiple) {
      field.handleChange([value])
      return
    }
    field.handleChange(value)
    setOpen(false)
  }

  const onClear = () => {
    field.handleChange(multiple ? [] : null)
    setOpen(false)
  }
  const onClearClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    onClear()
  }
  const onClearKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      onClear()
    }
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive text-xs">*</span>}
        </Label>
        <PopoverTrigger asChild>
          <Button
            id={id}
            role="combobox"
            aria-expanded={open}
            variant="outline"
            className="hover:bg-accent/20 h-auto w-full gap-2 font-normal"
            disabled={loading || disabled}
          >
            <div className="flex flex-1 flex-wrap gap-1">{getBadge()}</div>
            {loading ? (
              <LoaderCircleIcon className="size-4 shrink-0 animate-spin opacity-50" />
            ) : (
              <>
                {hasValue && (
                  <div
                    role="button"
                    aria-label="Clear"
                    onClick={onClearClick}
                    onKeyDown={onClearKeyDown}
                    tabIndex={0}
                    className="group"
                  >
                    <XIcon className="size-4 shrink-0 opacity-50 group-hover:opacity-100" />
                  </div>
                )}
                <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandList>
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected =
                  (Array.isArray(fieldValue) &&
                    fieldValue.includes(option.value)) ||
                  fieldValue === option.value

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    className={cn('my-1', isSelected && 'bg-accent')}
                    onSelect={onSelect}
                  >
                    <CheckIcon
                      className={cn(
                        'size-4',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
