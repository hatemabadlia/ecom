// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import ProductList from '../components/prodactlist';
import { getProducts } from '../services/productsservice';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = () => {
    // Implement filter logic
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="product-list">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;
