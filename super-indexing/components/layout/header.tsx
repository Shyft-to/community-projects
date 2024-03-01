"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const params = useSearchParams();
  const address = params.get("address");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (address) {
      setSearch(address);
    }
  }, [address]);

  return (
    <header className="bg-black">
      <div className="container flex items-center justify-between mx-auto h-20 px-4 md:px-8">
        <div className="flex items-center gap-8 flex-1 mr-24">
          <a href="/">
            <Image alt="logo" height={32} width={139} src="shyft_logo.svg" />
          </a>
          {address && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.replace(`/address?address=${search}`);
              }}
              className="w-full"
            >
              <input
                type="search"
                id="search"
                className="px-8 py-2 bg-transparent focus:outline-none border border-gray-300 text-white rounded-full focus:ring-brand focus:border-brand block w-full"
                placeholder="Enter any wallet address"
                autoComplete="off"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:underline cursor-pointer">OS Repository</a>
          <a className="hover:underline cursor-pointer">Shyft</a>
        </div>
      </div>
    </header>
  );
}
