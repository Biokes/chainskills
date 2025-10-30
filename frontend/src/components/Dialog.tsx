import { useEffect, useRef, type FC } from 'react'
import type { DialogState } from '../hooks/useDialog'
import '../styles/Dialog.css'

interface DialogProps {
  dialogState: DialogState
  onConfirm: () => void
  onCancel: () => void
}

const Dialog: FC<DialogProps> = ({ dialogState, onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dialogState.isOpen) {
      dialog.showModal()
      // Prevent body scroll when dialog opens
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'
    } else {
      dialog.close()
      // Restore body scroll when dialog closes
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [dialogState.isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current
    if (dialog && e.target === dialog) {
      if (dialogState.showCancel) {
        onCancel()
      } else {
        onConfirm()
      }
    }
  }

  const getIcon = () => {
    switch (dialogState.type) {
      case 'error':
        return '❌'
      case 'success':
        return '✅'
      case 'confirm':
        return '❓'
      default:
        return 'ℹ️'
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={`custom-dialog ${dialogState.type || 'info'}`}
      onClick={handleBackdropClick}
    >
      <div className="dialog-content">
        <div className="dialog-icon">{getIcon()}</div>
        {dialogState.title && <h2 className="dialog-title">{dialogState.title}</h2>}
        <p className="dialog-message">{dialogState.message}</p>
        <div className="dialog-buttons">
          {dialogState.showCancel && (
            <button
              className="dialog-btn dialog-btn-cancel"
              onClick={onCancel}
              type="button"
            >
              {dialogState.cancelText}
            </button>
          )}
          <button
            className="dialog-btn dialog-btn-confirm"
            onClick={onConfirm}
            type="button"
            autoFocus
          >
            {dialogState.confirmText}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default Dialog