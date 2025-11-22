"use client"
import ReactModal from "react-modal"

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body")
}

const Modal = ({ isOpen, onRequestClose, title, children, headerClassName = "" }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="modal-content" // Apply to the content itself
      overlayClassName="modal-backdrop fade show"
      // Custom styles to mimic Bootstrap's centering and responsiveness
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px",
          width: "90%",
          padding: "0", // Bootstrap modals handle padding internally
          border: "none",
          borderRadius: ".3rem",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1050",
        },
      }}
    >
      <div className={`modal-header ${headerClassName}`}>
        <h5 className="modal-title">{title}</h5>
        <button
          type="button"
          className={`btn-close ${headerClassName.includes("bg-primary") || headerClassName.includes("bg-danger") || headerClassName.includes("text-white") ? "btn-close-white" : ""}`}
          onClick={onRequestClose}
        ></button>
      </div>
      <div className="modal-body">{children}</div>
    </ReactModal>
  )
}

export default Modal
