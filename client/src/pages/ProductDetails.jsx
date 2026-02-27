import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import ProductForm from "../components/ProductForm.jsx";

const ProductDetails = () => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <div className="m-5 p-5">
      <div className="product-details m-5">
        <img src={product.image} alt={product.name} style={{ width: "300px" }} />
        <h1><strong>Name:</strong> {product.name}</h1>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>In Stock:</strong> {product.countInStock}</p>
      </div>

      <button
        className="bg-white text-blue-600 font-semibold p-2 border border-blue-600 rounded hover:bg-blue-400 hover:text-white transition-colors duration-200"
        onClick={() => setShowProductForm(prev => !prev)}
      >
        {showProductForm ? "Hide Form" : "Update Product"}
      </button>

      {showProductForm && (
        <div style={{ marginTop: "20px" }}>
          <ProductForm product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;