import { Button } from '@/shared/ui/button'

import { useFormContext } from './contexts'

export function SubmitButton({
  size = 'lg',
  variant = 'default',
  disabled = false,
  ...props
}: React.ComponentProps<typeof Button>) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          {...props}
          size={size}
          variant={variant}
          disabled={isSubmitting || disabled}
          onClick={form.handleSubmit}
        />
      )}
    </form.Subscribe>
  )
}
