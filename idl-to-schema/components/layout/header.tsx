"use client";

import IconButton from "../ui/icon-button";
import Image from "next/image";
import Button from "../ui/button";
import { DiscordIcon } from "./footer";
import { GithubIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-black">
      <div className="container flex items-center justify-between mx-auto h-16 px-4 md:px-8">
        <a href="/">
          <Image alt="logo" height={32} width={139} src="shyft_logo.svg" />
        </a>
        <div className="flex gap-4">
          <IconButton
            className="shrink-0 text-white"
            as="a"
            label="Github"
            target="_blank"
            // TODO will update after the PR was merged
            href="https://github.com/Shyft-to/community-projects/tree/idl-to-sql"
          >
            <GithubIcon />
          </IconButton>

          <IconButton
            className="shrink-0 text-white"
            as="a"
            target="_blank"
            label="Dicord"
            href="https://discord.gg/8JyZCjRPmr"
          >
            <DiscordIcon className="w-8 h-8" />
          </IconButton>

          <a
            href="https://shyft.to/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Get API Key</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
