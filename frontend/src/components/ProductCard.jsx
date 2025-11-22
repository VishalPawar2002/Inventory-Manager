"use client"
import { FiEdit, FiTrash2 } from "react-icons/fi"

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
        <div className="position-relative">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="position-absolute top-0 end-0 p-2">
            <span
              className={`badge ${product.inStock ? "bg-success-subtle text-success-emphasis" : "bg-danger-subtle text-danger-emphasis"} shadow-sm`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="card-body d-flex flex-column p-4">
          <p className="card-text text-uppercase text-muted small fw-bold mb-2 tracking-wide">{product.category}</p>
          <h3 className="card-title h5 fw-bold text-dark mb-3">{product.name}</h3>

          <div className="mt-auto d-flex align-items-center justify-content-between">
            <p className="h4 text-primary fw-bold mb-0">₹{Number(product.price).toFixed(2)}</p>
          </div>
        </div>
        <div className="card-footer bg-white border-0 p-4 pt-0 d-flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <FiEdit className="me-2" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="btn btn-light text-danger flex-grow-1 d-flex align-items-center justify-content-center bg-opacity-10"
            style={{ backgroundColor: "var(--bs-danger-bg-subtle)" }}
          >
            <FiTrash2 className="me-2" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
