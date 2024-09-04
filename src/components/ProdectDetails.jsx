import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import { FaCartPlus, FaMoneyBillWave } from 'react-icons/fa';
import './ProductDetails.css';

const WilayaOptions = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
  "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane",
  "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah",
  "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Menia"
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, 'products', id));
      if (productDoc.exists()) {
        setProduct(productDoc.data());
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);

  const handleBuyNow = async () => {
    try {
      if (!phone || !wilaya) {
        alert('Please fill out the phone number and Wilaya.');
        return;
      }

      alert('Thank you for your purchase! We will contact you shortly.');

      // Prepare the purchase details with phone, Wilaya, image URL, color, and size
      const purchaseDetails = {
        productId: id,
        productName: product.name,
        imageUrl: product.imageUrl,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        price: product.price,
        phone: phone,
        wilaya: wilaya,
        timestamp: new Date(),
      };

      // Send the notification to the admin dashboard
      await setDoc(doc(db, 'admin', 'dashboard'), {
        notifications: arrayUnion(purchaseDetails),
      }, { merge: true });

      console.log('Notification sent to admin dashboard with purchase details');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Da{product.price}</p>

          <div className="product-options">
            <div className="size-selector">
              <div className="size-options">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-selector">
              <label>Select Color:</label>
              <div className="color-options">
                {product.colors?.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="phone-selector">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phone}
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="wilaya-selector">
              <label>Select Wilaya:</label>
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
              >
                <option value="">Select your Wilaya</option>
                {WilayaOptions.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="add-to-cart-button">
            <FaCartPlus /> Add to Cart
          </button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            <FaMoneyBillWave /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
