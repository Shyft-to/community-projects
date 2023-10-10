"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { findCollectionHolders } from "@/lib/shyft";
import isValidPublicKey from "@/lib/is-public-key";
import MessageCarousel from "@/components/message-carousel";
import { trackEvent } from "@/lib/gtag";
import HolderList from "./HolderList";

export type StatusEnum = "idle" | "processing" | "finished";

const LONG_RUNNING_TASK = "long_task";

export default function Form() {
  const [collection, setCollection] = useState("");
  const [status, setStatus] = useState<StatusEnum>("idle");
  const [isLongTask, setIsLongTask] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [holders, setHolders] = useState<{ address: string; total: number }[]>(
    []
  );

  const [focused, setIsFocused] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("FIND_HOLDER", { collection });

    if (!collection) return;

    if (!isValidPublicKey(collection)) {
      setError("Invalid public key");
      return;
    }

    try {
      setHolders([]);
      setError("");
      setStatus("processing");

      const taskFetch = findCollectionHolders(collection);

      const result = await Promise.race([
        taskFetch,
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(LONG_RUNNING_TASK);
          }, 3000)
        ),
      ]);

      if (typeof result === "string" && result === LONG_RUNNING_TASK) {
        setIsLongTask(true);
      } else {
        // @ts-ignore
        setHolders(result ?? []);
        return;
      }

      const fetchResult = await taskFetch;
      setHolders(fetchResult);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Unknown error");
    } finally {
      setStatus("finished");
    }
  };

  return (
    <>
      <form
        className="max-w-screen-md w-full text-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="collection"
          name="collection"
          value={collection}
          onChange={(event) => setCollection(event.target.value)}
          className="border text-sm rounded-full block w-full px-4 py-3 outline-none bg-transparent placeholder-grey text-white focus:ring-brand focus:border-brand"
          placeholder="Collection address"
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {error && (
          <p className="text-left text-sm font-medium text-red-500 mt-2">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-center">
          <Button
            className={`flex items-center gap-2 px-8 ${
              status === "finished" && !focused
                ? "bg-gray-500 hover:!bg-gray-500"
                : ""
            }`}
            type="submit"
            disabled={status === "processing"}
          >
            {status === "processing" ? "Finding" : "Find"}
            {status === "processing" ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              <SearchIcon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {isLongTask && <MessageCarousel />}

        <HolderList holders={holders} status={status} />
      </form>
    </>
  );
}
