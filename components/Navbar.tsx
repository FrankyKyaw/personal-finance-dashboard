"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="px-12 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <span className="ml-2 text-xl font-bold">FinanceTracker</span>
      </Link>
      <nav className="flex gap-8 ml-auto">
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href="#faq"
        >
          FAQ
        </Link>
      </nav>
    </header>
  );
};
// const Navbar = () => {
//   return (
//     <div className="fixed top-0 w-full flex flex-col">
//       <header className="bg-black p-4 text-white">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <h1 className="text-xl font-bold">Budget</h1>
//           <nav>
//             <ul className="flex space-x-6">
//               <li className="hover:text-gray-300">
//                 <a href="#">Home</a>
//               </li>
//               <li className="hover:text-gray-300">
//                 <a href="#">About</a>
//               </li>
//               <li className="hover:text-gray-300">
//                 <a href="#">Services</a>
//               </li>
//               <li className="hover:text-gray-300">
//                 <a href="#">Contact</a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// };

export default Navbar;
