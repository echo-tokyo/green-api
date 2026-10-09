import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react'

export function useDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    onClose()
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const isBackdropClick = event.target === event.currentTarget

    if (isBackdropClick) onClose()
  }

  return { dialogRef, handleCancel, handleBackdropClick }
}
