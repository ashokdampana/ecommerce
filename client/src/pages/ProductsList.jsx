import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import { CartContext } from "../context/CartContext.jsx";


const ProductsList = ({filter}) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product._id} className="border rounded-lg p-4 flex flex-col">
            <Link to={`/products/${product._id}`} className="flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">${product.price}</p>
            </Link>
            <button
              className="mt-4 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
