import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="input-group">
      <span className="input-group-text"><FiSearch /></span>
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control"
      />
    </div>
  );
};

export default SearchBar;
