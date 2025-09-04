import { GridActionsCellItem } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Props {
  onClick: () => void
}

export function ShowAction({ onClick }: Props) {
  return (
    <GridActionsCellItem
      icon={<VisibilityIcon />}
      label="Show"
      onClick={onClick}
    />
  )
}
