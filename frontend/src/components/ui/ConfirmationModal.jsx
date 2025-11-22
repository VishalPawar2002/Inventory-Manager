"use client"
import Modal from "./Modal"
import { FiAlertTriangle } from "react-icons/fi"

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} title={title} >
      <div className="d-flex align-items-start mb-3 ">
        <div className="flex-shrink-0 me-3 ">
          <div className="icon-circle bg-danger-soft">
            <FiAlertTriangle className="h4 mb-0" aria-hidden="true" />
          </div>
        </div>
        <div>
          <p className="mb-0 mt-2 text-muted">{message}</p>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-light-secondary" onClick={onRequestClose}>
          {cancelText}
        </button>
        <button type="button" disabled={isLoading} className="btn btn-danger" onClick={onConfirm}>
          {isLoading ? "Deleting..." : confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
