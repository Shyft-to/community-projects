"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push(`/address?address=${value}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:font-extrabold lg:text-5xl mb-16">
          Check <span className="text-yellow">Footprint of Your Wallet</span> on
          Solana
        </h2>
        <form
          onSubmit={handleSubmit}
          className=" text-center max-w-lg w-full mx-auto"
        >
          <div className="relative">
            <input
              type="search"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              id="search"
              className="text-center bg-transparent transition-all focus:outline-none border border-gray-300 text-white rounded-full focus:ring-brand focus:border-brand block w-full ps-10 p-2.5"
              placeholder="Enter any wallet address"
              autoComplete="off"
            />
          </div>
          <Button type="submit" className="mt-10 px-12">
            Enter
          </Button>
        </form>
      </div>
    </main>
  );
}
