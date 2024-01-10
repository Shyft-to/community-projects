"use client";

import Form from "@/components/Form";
import GeneratedCode from "@/components/GeneratedCode";
import Button from "@/components/ui/button";
import { downloadSQL } from "@/lib/download";
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
  const [accountCount, setAccountCount] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleSubmit = (fileStr: string) => {
    try {
      setGenerated(false);
      const { accountCount, sql } = idlToDatabaseSchema(JSON.parse(fileStr));
      setAccountCount(accountCount);
      setSql(sql ?? "");
      setGenerated(true);
    } catch (error: any) {
      alert(error?.message);
      setGenerated(false);
    }
  };

  return (
    <main className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20">
      <h2 className="text-4xl text-white font-extrabold text-center mb-2">
        IDL To SQL
      </h2>
      <p className="text-xl text-slate-200 font-medium text-center mb-10">
        Convert Solana IDL to SQL Schema
      </p>
      <Form onSubmit={handleSubmit} />
      <div className="w-full max-w-screen-md mx-auto mt-20">
        <div className="flex items-center justify-between mb-5">
          {generated && (
            <Button onClick={() => downloadSQL(sql)}>Download</Button>
          )}
          <p className="font-semibold">Accounts: {accountCount}</p>
        </div>
        <GeneratedCode text={sql} />
      </div>
    </main>
  );
}
