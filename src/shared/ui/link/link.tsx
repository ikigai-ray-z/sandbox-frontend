import { createLink } from '@tanstack/react-router'
import { Button, type ButtonProps } from '@mui/material'

type Props = ButtonProps<'a'>

const MUIButtonLinkComponent = ({ ref, ...props }: Props) => (
  <Button ref={ref} component="a" {...props} />
)

export const Link = createLink(MUIButtonLinkComponent)
