import { createFormHook } from '@tanstack/react-form'

import { SelectField } from './select-field'
import { fieldContext, formContext } from './contexts'
import { SubmitButton } from './submit-button'
import { ResetButton } from './reset-button'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Select: SelectField,
  },
  formComponents: {
    SubmitButton,
    ResetButton,
  },
  fieldContext,
  formContext,
})
