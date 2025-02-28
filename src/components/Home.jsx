import React from "react";
import Navbar from "./Navbar";


function Home() {
  const categories = [
    {
      title: "Modern Sofas",
      description: "Elegant and comfortable seating solutions",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
    },
    {
      title: "Dining Sets",
      description: "Perfect for family gatherings",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80",
    },
    {
      title: "Bedroom",
      description: "Create your perfect sanctuary",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80",
    },
    {
      title: "Office",
      description: "Professional workspace furniture",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <>
  <Navbar/>

  
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">Furniture Store</h1>
      </header>
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Premium Furniture
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium furniture pieces designed to transform your space
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.title} 
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 transition duration-300 hover:text-purple-600">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>  </>

  );
}

export default Home;
