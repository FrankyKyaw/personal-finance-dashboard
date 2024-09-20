"use client";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center">
        <section className="flex flex-col items-center justify-center text-center min-h-screen bg-blue-50 w-full">
          <h1 className="text-4xl font-bold mb-4">
            Take control of your finances
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-[700px]">
            Finance tracker is the ultimate tool to help you manage your money
            and reach your financial goals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="inline-flex items-center justify-center h-10 px-8 bg-black bg-opacity-100 shadow transition-colors text-white text-sm font-medium rounded-md hover:bg-black hover:bg-opacity-80"
            >
              Get Started
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="inline-flex items-center justify-center h-10 px-8 bg-black bg-opacity-100 shadow transition-colors text-white text-sm font-medium rounded-md hover:bg-black hover:bg-opacity-80"
            >
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
