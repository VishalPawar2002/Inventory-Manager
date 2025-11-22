"use client"

import { useState, useEffect } from "react"
import { FiSave, FiX } from "react-icons/fi"

const ProductForm = ({ onSubmit, onCancel, product, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
    inStock: true,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        imageUrl: "",
        inStock: true,
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required."
    if (!formData.category) newErrors.category = "Category is required."
    if (!formData.price) {
      newErrors.price = "Price is required."
    } else if (isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = "Price must be a non-negative number."
    }
    if (!formData.imageUrl) {
      newErrors.imageUrl = "Image URL is required."
    } else {
      try {
        new URL(formData.imageUrl)
      } catch (_) {
        newErrors.imageUrl = "Please enter a valid URL."
      }
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoading) return
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    onSubmit(formData)
  }

  const inputClasses = "form-control"
  const labelClasses = "form-label"

  return (
    <form onSubmit={handleSubmit} className="mb-3 bg-black text-white p-5 rounded">
      <div className="mb-3">
        <label htmlFor="name" className={labelClasses}>
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${inputClasses} shadow-sm`}
        />
        {errors.name && <div className="text-danger form-text">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className={labelClasses}>
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`${inputClasses} shadow-sm`}
        />
        {errors.category && <div className="text-danger form-text">{errors.category}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className={labelClasses}>
          Price (₹)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`${inputClasses} shadow-sm`}
          step="0.01"
        />
        {errors.price && <div className="text-danger form-text">{errors.price}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className={labelClasses}>
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`${inputClasses} shadow-sm`}
        />
        {errors.imageUrl && <div className="text-danger form-text">{errors.imageUrl}</div>}
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
          className="form-check-input"
        />
        <label htmlFor="inStock" className="form-check-label">
          In Stock
        </label>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-light text-secondary border-0"
          style={{ backgroundColor: "#f1f5f9" }}
        >
          <FiX className="me-2" />
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn btn-primary d-flex align-items-center px-4">
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <FiSave className="me-2" />
          )}
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  )
}

export default ProductForm;
