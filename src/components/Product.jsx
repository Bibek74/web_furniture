import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Product() {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch products from local storage
    const storedProduct = localStorage.getItem("uploadedProduct");
    const parsedProduct = storedProduct ? [JSON.parse(storedProduct)] : [];
    setProducts(parsedProduct);
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName && email && selectedProduct) {
      const purchasedProduct = {
        id: new Date().getTime(),
        userName,
        email,
        productName: selectedProduct.name,
        price: selectedProduct.price,
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existingOrders, purchasedProduct]));

      alert("Product purchased successfully!");
      setShowForm(false);
      setUserName("");
      setEmail("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Products</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
          {products.map((product, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "350px", padding: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }} />
              <div style={{ flexGrow: 1 }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "8px" }}>{product.name}</h2>
                <p style={{ color: "gray", marginTop: "4px" }}>
                  {expanded[index] ? product.description : product.description.split(" ").slice(0, 10).join(" ") + "..."}
                </p>
                <button onClick={() => toggleReadMore(index)} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                  {expanded[index] ? "Read Less" : "Read More"}
                </button>
                <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "8px" }}>NRS {product.price}</p>
              </div>
              <button 
                onClick={() => handleBuyNow(product)} 
                style={{ marginTop: "12px", width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h2 style={{ marginBottom: "10px" }}>Purchase Product</h2>
            <p><strong>Product:</strong> {selectedProduct?.name}</p>
            <p><strong>Price:</strong> NRS {selectedProduct?.price}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Confirm Purchase
              </button>
            </form>
            <button onClick={() => setShowForm(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
