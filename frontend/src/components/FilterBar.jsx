"use client"

const FilterBar = ({ categories, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
  const selectClasses = "form-select"

  return (
    <div className="d-flex flex-column flex-md-row gap-3">
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={selectClasses}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectClasses}>
        <option value="">Sort by Price</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
}

export default FilterBar
