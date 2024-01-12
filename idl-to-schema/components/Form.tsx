"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

export default function Form({
  onSubmit,
}: {
  onSubmit: (fileStr: string, filename?: string) => void;
}) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(file, filename);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      setFilename(e.target.files?.[0].name);
      fileReader.readAsText(e.target.files?.[0], "UTF-8");
      fileReader.onload = (e) => {
        setFile(e?.target?.result as string);
      };
    }
  };

  return (
    <div className="max-w-screen-md w-full">
      <form className="w-full gap-6 flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="file-input" className="sr-only">
          Select IDL file
        </label>
        <input
          type="file"
          name="file"
          id="file-input"
          placeholder="Select your IDL"
          className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4"
          onChange={handleChange}
        />

        <Button className="self-stretch px-8 text-base" type="submit">
          Generate
        </Button>
      </form>
      <p className="text-base text-slate-200 font-medium mt-4">
        Looking to Index Solana Programs? Try out{" "}
        <a
          className="hover:text-brand underline"
          target="_blank"
          href="https://docs.shyft.to/solana-indexers/instant-graphql-apis"
        >
          Instant GraphQL Indexers
        </a>
      </p>
    </div>
  );
}
