// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card-link"
          >
            <div className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} Da</p>
              <p>{product.description}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
  