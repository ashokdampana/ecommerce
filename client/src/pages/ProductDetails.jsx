import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import ProductForm from "../components/ProductForm.jsx";
import { CartContext } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [showProductForm, setShowProductForm] = useState(false); // use boolean for clarity


  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/api/products/${id}`);
        console.log(`/api/products/${id}`);
        console.log('one product in details : ', res.data);
        setProduct(res.data?.product || res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct(); 
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6 bg-white shadow rounded-lg p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/3 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="mb-2 text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand || 'N/A'}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-xl font-semibold mt-2 text-green-600">${product.price}</p>
          <p className="mt-1">In Stock: {product.countInStock}</p>

          <div className="mt-4">
            <input
              type="number"
              min="1"
              max={product.countInStock || 1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-16 p-1 border rounded mr-2"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <button
        className="mt-6 bg-white text-blue-600 font-semibold p-2 border border-blue-600 rounded hover:bg-blue-400 hover:text-white transition-colors duration-200"
        onClick={() => setShowProductForm(prev => !prev)}
      >
        {showProductForm ? "Hide Form" : "Update Product"}
      </button>

      {showProductForm && (
        <div className="mt-6">
          <ProductForm product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;