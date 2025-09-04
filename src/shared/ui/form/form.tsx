import type { FormHTMLAttributes } from 'react'

export function Form({
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit?.(e)
  }

  return (
    <form {...props} noValidate onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
