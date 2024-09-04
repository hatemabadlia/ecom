// src/components/Navbar.js
import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Navbar = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Pardais Stores</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <FaSearch />
      </div>
      <div className="filter-icon" onClick={toggleCategories}>
        <FaFilter />
      </div>
      {showCategories && (
        <div className="categories-dropdown">
          <ul>
            <li onClick={() => onFilter('electronics')}>Electronics</li>
            <li onClick={() => onFilter('fashion')}>Fashion</li>
            <li onClick={() => onFilter('home')}>Home & Kitchen</li>
            <li onClick={() => onFilter('beauty')}>Beauty</li>
            <li onClick={() => onFilter('sports')}>Sports</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
