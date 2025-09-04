import { createFormHook } from '@tanstack/react-form'

import { SelectField } from './select-field'
import { fieldContext, formContext } from './contexts'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Select: SelectField,
  },
  formComponents: {},
  fieldContext,
  formContext,
})
