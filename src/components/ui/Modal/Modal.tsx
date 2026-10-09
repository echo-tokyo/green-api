import { useId, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { IconButton } from '../IconButton/IconButton'
import { useDialog } from './use-dialog'
import styles from './Modal.module.scss'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const titleId = useId()
  const { dialogRef, handleCancel, handleBackdropClick } = useDialog(
    open,
    onClose,
  )

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <IconButton icon={X} label='Закрыть' onClick={onClose} />
        </header>
        {open && children}
      </div>
    </dialog>
  )
}
