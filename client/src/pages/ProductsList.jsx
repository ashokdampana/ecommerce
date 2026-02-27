import '../styles/ProductsList.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";


const ProductsList = ({filter}) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get(
          filter ? `/api/products?category=${filter}` : "/api/products"
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [filter]);

  return (
    <div>
      <h1>Products List</h1>
      <ul className="products-items">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <Link to={`/products/${product._id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
