"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

export default function Form({
  onSubmit,
}: {
  onSubmit: (fileStr: string) => void;
}) {
  const [file, setFile] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      fileReader.readAsText(e.target.files?.[0], "UTF-8");
      fileReader.onload = (e) => {
        setFile(e?.target?.result as string);
      };
    }
  };

  return (
    <>
      <form
        className="max-w-screen-md w-full gap-6 flex items-center"
        onSubmit={handleSubmit}
      >
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
    </>
  );
}
