import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-10 mt-4">
      <h1 className="text-5xl font-bold">Personal Finance Dashboard</h1>
      <p className="text-lg text-center">
        A simple dashboard to track your personal finance
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
      </div>
    </main>
  );
}
