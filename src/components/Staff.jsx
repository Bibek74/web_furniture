import React from "react";
import AdminNav from "./AdminNav";

function Staff() {
  // Sample static data
  const orders = [
    {
      id: "001",
      userName: "John Doe",
      email: "john@example.com",
      productName: "Wooden Bed",
      price: "15,000",
      status: "Delivered",
    },
    {
      id: "002",
      userName: "Jane Doe",
      email: "jane@example.com",
      productName: "Wooden Chair",
      price: "5,000",
      status: "Not Delivered",
    },
    {
      id: "003",
      userName: "Alex Roy",
      email: "alex@example.com",
      productName: "Wooden Table",
      price: "8,000",
      status: "Delivered",
    },
  ];

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
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="text-center bg-orange-100 hover:bg-orange-200"
                >
                  <td className="border p-3">{order.id}</td>
                  <td className="border p-3">{order.userName}</td>
                  <td className="border p-3">{order.email}</td>
                  <td className="border p-3">{order.productName}</td>
                  <td className="border p-3">{order.price}</td>
                  <td
                    className={`border p-3 ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
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
