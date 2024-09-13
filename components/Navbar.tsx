"use client";

import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex flex-col">
      <header className="bg-black p-4 text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Budget</h1>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:text-gray-300">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-gray-300">
                <a href="#">About</a>
              </li>
              <li className="hover:text-gray-300">
                <a href="#">Services</a>
              </li>
              <li className="hover:text-gray-300">
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
