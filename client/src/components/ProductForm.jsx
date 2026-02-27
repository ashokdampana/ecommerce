import React, { useState, useEffect } from 'react';
import '../styles/ProductForm.css'

const ProductForm = ({ product }) => {
  const [forms, setForms] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0
  });

  // When product changes, populate the form
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForms({
        name: product.name || "",
        image: product.image || "",
        brand: product.brand || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || 0,
        countInStock: product.countInStock || 0
      });
    }
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForms(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(forms);
    // Here you can call your API to update the product
  };

  return (
    <div >
      {/* <h2>Update Product</h2> */}
      <form onSubmit={handleSubmit} className='product-form'>
        <input name="name" value={forms.name} onChange={handleChange} placeholder="Name" />
        <input name="image" value={forms.image} onChange={handleChange} placeholder="Image URL" />
        <input name="brand" value={forms.brand} onChange={handleChange} placeholder="Brand" />
        <input name="category" value={forms.category} onChange={handleChange} placeholder="Category" />
        <input name="description" value={forms.description} onChange={handleChange} placeholder="Description" />
        <input name="price" type="number" value={forms.price} onChange={handleChange} placeholder="Price" />
        <input name="countInStock" type="number" value={forms.countInStock} onChange={handleChange} placeholder="In Stock" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm; 