import React from "react";
import Navbar from "./Navbar";


const About = () => {
  return (
    <>
    <Navbar/>
    
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">Welcome to Our Furniture Store</h1>
        <p className="text-xl text-gray-600 mt-4">We bring comfort and style to your home.</p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
          <p className="text-lg text-gray-600 mt-4">
            At our furniture store, we believe that the right furniture can transform any space.
            Since our founding, we've been committed to offering high-quality pieces that
            blend design and functionality. Whether you're decorating your living room, bedroom,
            or office, we have something that fits your style and needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-4">
            We are dedicated to providing our customers with a seamless shopping experience,
            exceptional customer service, and a wide selection of stylish, durable furniture.
            Our goal is to make sure every home is furnished with comfort and elegance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mt-4">
            Our team consists of passionate individuals who are committed to making your home
            look and feel amazing. From our designers to our customer support team, we work
            together to provide the best possible experience for you.
          </p>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2025 Furniture Store | All Rights Reserved</p>
      </footer>
    </div>
    </>
  );
};

export default About;
