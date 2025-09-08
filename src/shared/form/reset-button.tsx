import { Button } from '@/shared/ui/button'

import { useFormContext } from './contexts'

export function ResetButton({
  size = 'lg',
  variant = 'outline',
  disabled = false,
  onClick,
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
          onClick={(e) => {
            if (onClick) {
              onClick(e)
            } else {
              form.reset()
            }
          }}
        />
      )}
    </form.Subscribe>
  )
}
