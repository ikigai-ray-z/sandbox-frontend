import { Autocomplete, TextField, type AutocompleteProps } from '@mui/material'

type SelectProps<
  Value,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean,
> = Omit<
  AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'clearOnEscape' | 'openOnFocus' | 'disableCloseOnSelect'
> & {
  label: React.ReactNode
}

export function Select<
  Value,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean,
>({
  label,
  ...props
}: SelectProps<Value, Multiple, DisableClearable, FreeSolo>) {
  return (
    <Autocomplete
      {...props}
      clearOnEscape
      disableCloseOnSelect
      openOnFocus
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}
