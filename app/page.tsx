"use client";
import Navbar from "@/components/Navbar";
import { CheckCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Take Control of Your Finances
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track your spending, set budgets, and achieve your financial
                  goals with our easy-to-use personal finance app.
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="inline-flex items-center justify-center h-10 px-8 bg-black bg-opacity-100 shadow transition-colors text-white text-sm font-medium rounded-md hover:bg-black hover:bg-opacity-80"
                >
                  Get Started
                </button>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="inline-flex items-center justify-center h-10 px-8 bg-opacity-100 shadow transition-colors text-black border text-sm font-medium rounded-md hover:bg-black hover:bg-opacity-10"
                >
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Link Bank Accounts",
                  description:
                    "Securely connect your bank accounts for real-time updates",
                },
                {
                  title: "Track Transactions",
                  description:
                    "Automatically categorize and track all your transactions",
                },
                {
                  title: "Set Budgets",
                  description:
                    "Create custom budgets and get alerts when you're close to limits",
                },
                {
                  title: "Financial Insights",
                  description:
                    "Get personalized insights to improve your financial health",
                },
                {
                  title: "Goal Setting",
                  description:
                    "Set and track progress towards your financial goals",
                },
                {
                  title: "Secure & Private",
                  description:
                    "Bank-level security to keep your financial data safe",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <CheckCircle className="h-12 w-12 mb-4 text-green-500" />

                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Pricing</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {[
                { name: "Basic", price: "Free", features: ["Link up to 2 bank accounts", "Track up to 100 transactions/month", "Set up to 3 budgets"] },
                { name: "Pro", price: "$9.99/month", features: ["Link unlimited bank accounts", "Track unlimited transactions", "Set unlimited budgets", "Advanced financial insights"] },
                { name: "Business", price: "Contact Us", features: ["Everything in Pro", "Multi-user access", "Dedicated support", "Custom integrations"] },
              ].map((plan, index) => (
                <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-h-[370px]">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}</p>
                  <ul className="mb-6 space-y-2 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="inline-flex items-center justify-center h-10 px-8 bg-opacity-100 shadow transition-colors text-black border text-sm font-medium rounded-md hover:bg-black hover:bg-opacity-10">
                    {index === 2 ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 FinanceTracker Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
      {/* <main className="flex flex-col items-center">
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
      </main> */}
    </div>
  );
}
