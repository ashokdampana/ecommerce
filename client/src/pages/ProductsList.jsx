import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import useTanQuery from "../hooks/useTanQuery.js";

const ProductsList = ({ filter }) => {
  const { addToCart } = useContext(CartContext);

  const { data, isLoading, isError } = useTanQuery(
    filter ? `/api/products?category=${filter}` : "/api/products",
    ["products", filter]
  );

  if (isLoading) return <div className="page-center"><h2>Loading products...</h2></div>;
  if (isError) return <div className="page-center"><p className="form-error">Failed to load products.</p></div>;

  const products = data?.products || [];

  return (
    <div className="p-4">
      <h2>Products</h2>
      
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <Link to={`/products/${product._id}`} className="flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded"
              />
              <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">${product.price}</p>
            </Link>
            
            <button
              className="btn-primary mt-4 py-1" 
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
