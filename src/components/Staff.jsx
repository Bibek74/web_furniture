import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

function Staff() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Retrieve orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <>
      <AdminNav />
      <div className="h-full min-h-screen bg-orange-500 flex flex-col items-center p-6">
        <h1 className="text-5xl font-bold text-white mb-6">All Users</h1>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">Unique ID</th>
                <th className="border p-3">User Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Product Name</th>
                <th className="border p-3">Price (NRS)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center bg-orange-100 hover:bg-orange-200">
                  <td className="border p-3">{order.id}</td>
                  <td className="border p-3">{order.userName}</td>
                  <td className="border p-3">{order.email}</td>
                  <td className="border p-3">{order.productName}</td>
                  <td className="border p-3">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Staff;
