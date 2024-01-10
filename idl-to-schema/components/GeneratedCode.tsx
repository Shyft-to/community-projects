"use client";

import { CopyBlock, dracula } from "react-code-blocks";

export default function GeneratedCode({ text }: { text: string }) {
  return (
    <CopyBlock
      customStyle={{
        padding: "24",
      }}
      text={text}
      theme={dracula}
      language="sql"
    />
  );
}
