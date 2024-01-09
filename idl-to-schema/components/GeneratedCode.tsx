"use client";

import { CopyBlock, dracula } from "react-code-blocks";

export default function GeneratedCode({ text }: { text: string }) {
  return (
    <div className="w-full max-w-screen-md mx-auto mt-10">
      <CopyBlock
        customStyle={{
          padding: "24",
        }}
        text={text}
        theme={dracula}
        language="sql"
      />
    </div>
  );
}
