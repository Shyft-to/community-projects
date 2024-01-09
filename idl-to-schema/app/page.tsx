"use client";

import Form from "@/components/Form";
import GeneratedCode from "@/components/GeneratedCode";
import { idlToDatabaseSchema } from "@/lib/idl-to-schema";
import { useState } from "react";

const sampleSql = `
-- Sample
CREATE TABLE "NFT" (
	"pubkey" varchar PRIMARY KEY
);
`;

export default function Home() {
  const [sql, setSql] = useState(sampleSql);

  const handleSubmit = (fileStr: string) => {
    try {
      const result = idlToDatabaseSchema(JSON.parse(fileStr));
      setSql(result ?? "");
    } catch (error: any) {
      alert(error?.message);
    }
  };

  return (
    <main className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20">
      <h2 className="text-4xl text-white font-extrabold text-center mb-10">
        IDL To SQL
      </h2>
      <Form onSubmit={handleSubmit} />
      <GeneratedCode text={sql} />
    </main>
  );
}
