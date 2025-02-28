import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Product() {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // Fetch products from database (Firebase or API)
    // Example static data for now
    setProducts([
      {
        id: 1,
        name: "Wooden Bed",
        description: "Premium quality wooden bed with storage. This bed is made from high-quality wood and ensures durability and comfort.",
        price: "NRS 25,000",
        image: "https://bedknobsherts.co.uk/wp-content/uploads/2019/12/image-hadley-high-footend-wooden-bed-frame.jpg", 
      },
      {
        id: 2,
        name: "Dining Table",
        description: "Elegant dining table for your home. It features a modern design with a sturdy build, perfect for family meals and gatherings.",
        price: "NRS 15,000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_mOS7f1aUjA64vtJVN3jw1jdtt6Pt7FJaHA&s",
      },
    ]);
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Products</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
          {products.map((product) => (
            <div key={product.id} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "350px", padding: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }} />
              <div style={{ flexGrow: 1 }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "8px" }}>{product.name}</h2>
                <p style={{ color: "gray", marginTop: "4px" }}>
                  {expanded[product.id] ? product.description : product.description.split(" ").slice(0, 10).join(" ") + "..."}
                </p>
                <button onClick={() => toggleReadMore(product.id)} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                  {expanded[product.id] ? "Read Less" : "Read More"}
                </button>
                <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "8px" }}>{product.price}</p>
              </div>
              <button style={{ marginTop: "12px", width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
