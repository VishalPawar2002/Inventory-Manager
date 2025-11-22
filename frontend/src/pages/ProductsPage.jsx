"use client"

import { useState, useEffect, useMemo } from "react"
import { FiPlus, FiAlertCircle, FiInbox } from "react-icons/fi"
import * as api from "../services/api"

import ProductCard from "../components/ProductCard"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import ProductForm from "../components/ProductForm"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"
import Modal from "../components/ui/Modal"
import ConfirmationModal from "../components/ui/ConfirmationModal"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // Form/Action States
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProductId, setDeletingProductId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filtering and Sorting States
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("")

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await api.getProducts()
      setProducts(response)
      setError(null)
    } catch (err) {
      setError("Failed to fetch products. Please check the connection and try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category)
    return [...new Set(allCategories)]
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === "price-asc") return a.price - b.price
        if (sortOrder === "price-desc") return b.price - a.price
        return 0
      })
    }

    return result
  }, [products, searchQuery, selectedCategory, sortOrder])

  const handleOpenAddModal = () => {
    setEditingProduct(null)
    setIsFormModalOpen(true)
  }

  const handleOpenEditModal = (product) => {
    setEditingProduct(product)
    setIsFormModalOpen(true)
  }

  const handleOpenDeleteModal = (id) => {
    setDeletingProductId(id)
    setIsConfirmModalOpen(true)
  }

  const closeModal = () => {
    setIsFormModalOpen(false)
    setIsConfirmModalOpen(false)
    setEditingProduct(null)
    setDeletingProductId(null)
  }

  const handleFormSubmit = async (productData) => {
    setIsSubmitting(true)
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct._id, productData)
      } else {
        await api.createProduct(productData)
      }
      await fetchProducts()
      closeModal()
    } catch (err) {
      setError("Failed to save product. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true)
    try {
      await api.deleteProduct(deletingProductId)
      await fetchProducts()
      closeModal()
    } catch (err) {
      setError("Failed to delete product. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center p-5">
          <div className="bg-white p-5 rounded-3 shadow-sm d-inline-block">
            <FiAlertCircle className="mx-auto text-danger h1 mb-3" />
            <h3 className="h4 text-dark">Unable to load products</h3>
            <p className="text-muted mb-4">{error}</p>
            <button onClick={fetchProducts} className="btn btn-primary px-4">
              Try Again
            </button>
          </div>
        </div>
      )
    }

    if (filteredAndSortedProducts.length === 0) {
      return (
        <div className="text-center p-5">
          <div className="bg-white p-5 rounded-3 shadow-sm d-inline-block" style={{ maxWidth: "400px" }}>
            <div className="bg-light rounded-circle p-3 d-inline-block mb-3">
              <FiInbox className="text-secondary h1 mb-0" />
            </div>
            <h3 className="h4 text-dark">No products found</h3>
            <p className="text-muted mb-4">
              {searchQuery || selectedCategory
                ? "We couldn't find any matches for your filters."
                : "Your inventory is empty."}
            </p>
            <button onClick={handleOpenAddModal} className="btn btn-primary px-4">
              <FiPlus className="me-2" /> Add First Product
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Navbar / Header Section */}
      <div className="bg-white border-bottom shadow-sm sticky-top mb-5">
        <div className="container py-3">
          <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex align-items-center text-primary">
              {/* Simple Logo Placeholder */}
              <div className="bg-primary text-white p-2 rounded me-3">
                <FiInbox size={24} />
              </div>
              <h1 className="h4 mb-0 fw-bold text-dark">Inventory Manager</h1>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="btn btn-primary d-flex align-items-center justify-content-center shadow-sm"
            >
              <FiPlus className="me-2" />
              <span>Add New Product</span>
            </button>
          </header>
        </div>
      </div>

      <div className="container">
        {/* Filters Section */}
        <div className="bg-white p-4 rounded-3 shadow-sm mb-5 border">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <div className="vr d-none d-lg-block mx-2 text-muted opacity-25"></div>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>

        <main>{renderContent()}</main>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={closeModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        headerClassName="bg-primary text-white"
      >
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          product={editingProduct}
          isLoading={isSubmitting}
        />
      </Modal>

      <ConfirmationModal
      
        isOpen={isConfirmModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action is permanent."
        isLoading={isSubmitting}
      />
    </div>
  )
}

export default ProductsPage
