import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';

function ManageProduct() {
  const [products, setProducts] = useState([]);

  // Function to handle product deletion
  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id); // Filter out the deleted product
    setProducts(updatedProducts);
    localStorage.setItem("uploadedProducts", JSON.stringify(updatedProducts)); // Update localStorage after deleting
  };

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
    setProducts(storedProducts);
  }, []); // Empty dependency array means this runs only once after initial render

  return (
    <>
      <AdminNav />
      <h1 className="text-2xl font-semibold my-6">Manage Products</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Product Name</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-6 py-3">{product.name}</td>
              <td className="px-6 py-3">{product.price}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => handleDelete(product.id)} // Pass product's unique id
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageProduct;
