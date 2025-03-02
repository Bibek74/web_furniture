import React, { useState } from 'react';
import AdminNav from './AdminNav';

// Function to save product with a unique id
const saveProduct = (product) => {
  let existingProducts = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
  const newProduct = { ...product, id: Date.now() }; // Add unique ID using Date.now()
  existingProducts.push(newProduct); // Append new product
  localStorage.setItem("uploadedProducts", JSON.stringify(existingProducts));
};

function AdminDashboard() {
  const [product, setProduct] = useState({
    name: '',
    category: 'Furniture',
    price: '',
    imageUrl: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    saveProduct(product); // Use the saveProduct function here
    alert('Product uploaded successfully!');
    setProduct({ name: '', category: 'Furniture', price: '', imageUrl: '', description: '' });
  };

  return (
    <>
      <AdminNav />
      <div className="h-[800px] bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Upload Furniture Product</h1>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Product Name</label>
            <input 
              type='text' 
              name='name' 
              value={product.name} 
              onChange={handleChange} 
              required 
              className='w-full p-2 border rounded'/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Category</label>
            <input 
              type='text' 
              name='category' 
              value={product.category} 
              readOnly 
              className='w-full p-2 border bg-gray-200 rounded'/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Price (NRS)</label>
            <input 
              type='number' 
              name='price' 
              value={product.price} 
              onChange={handleChange} 
              required 
              className='w-full p-2 border rounded'/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Image URL</label>
            <input 
              type='text' 
              name='imageUrl' 
              value={product.imageUrl} 
              onChange={handleChange} 
              required 
              className='w-full p-2 border rounded'/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Description</label>
            <textarea 
              name='description' 
              value={product.description} 
              onChange={handleChange} 
              required 
              className='w-full p-2 border rounded'/>
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Upload Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminDashboard;
