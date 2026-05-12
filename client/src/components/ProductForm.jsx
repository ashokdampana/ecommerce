import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useTanMutation from '../hooks/useTanMutation';

const productSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  countInStock: Yup.number().min(0, 'Stock must be positive').required('Stock count is required'),
  // no validation for image here, handled separately
});

const ProductForm = ({ product, method, id }) => {
  const [file, setFile] = useState(null);

  const initialValues = {
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price || 0,
    countInStock: product?.countInStock || 0,
  };

  const url = method === 'POST' ? '/api/products' : `/api/products/${id}`;
  const { mutate, isPending, isError, error } = useTanMutation(method, url, 'products');

  const handleSubmit = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });
    if (file) {
      data.append('image', file); // field name must match multer setup
    }

    mutate({ body: data }); // send FormData to backend
  };

  return (
    <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-3 max-w-lg">
        <Field name="name" placeholder="Name" className="p-2 border rounded" />
        <ErrorMessage name="name" component="div" className="form-error" />

        {/* File upload instead of URL */}
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded"
        />

        <Field name="brand" placeholder="Brand" className="p-2 border rounded" />
        <ErrorMessage name="brand" component="div" className="form-error" />

        <Field name="category" placeholder="Category" className="p-2 border rounded" />
        <ErrorMessage name="category" component="div" className="form-error" />

        <Field name="description" placeholder="Description" className="p-2 border rounded" />
        <ErrorMessage name="description" component="div" className="form-error" />

        <Field name="price" type="number" placeholder="Price" className="p-2 border rounded" />
        <ErrorMessage name="price" component="div" className="form-error" />

        <Field name="countInStock" type="number" placeholder="In Stock" className="p-2 border rounded" />
        <ErrorMessage name="countInStock" component="div" className="form-error" />

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {method === 'POST' ? 'Create Product' : 'Update Product'}
        </button>

        {isError && <div className="form-error">{error.message}</div>}
      </Form>
    </Formik>
  );
};

export default ProductForm;
