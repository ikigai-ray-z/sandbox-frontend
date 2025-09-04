import { GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Popover } from '@mui/material'
import { useId, useState } from 'react'

interface Props {
  onClick: () => void
}
export function DeleteAction({ onClick }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = useId()

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    onClick()
    setAnchorEl(null)
  }

  return (
    <>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        aria-describedby={id}
        onClick={handleOpen}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="font-medium">
            Are you sure you want to delete this item?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Popover>
    </>
  )
}
