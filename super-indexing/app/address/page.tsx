"use client";

import { CopyIcon, CheckIcon } from "lucide-react";
import truncate from "@/lib/truncate";
import IconButton from "@/components/ui/icon-button";
import ResultTabs from "@/components/result-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllListingsByWallet } from "@/lib/graphql";
import { NFTActivity } from "@/types";
import isValidPublicKey from "@/lib/is-public-key";
import Summary from "@/components/summary";
import { useCopyToClipboard } from "@/hook/use-copy";

export default function AddressPage() {
  const [activities, setActivities] = useState<NFTActivity[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const address = params.get("address");

  useEffect(() => {
    if (address) {
      setLoading(true);
      getAllListingsByWallet(address)
        .then(setActivities)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [address]);

  if (!address || !isValidPublicKey(address)) {
    // TODO render error page
    router.replace("/");
    return null;
  }

  return (
    <main className="container mx-auto px-4 md:px-8 py-24">
      <WalletText address={address} />
      <Summary />
      <ResultTabs activities={activities} loading={loading} />
    </main>
  );
}

const WalletText = ({ address }: { address: string }) => {
  const [_, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(address)
      .then(console.log)
      .finally(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      });
  };

  return (
    <div className="flex items-center gap-2 mb-10">
      <p className="text-xl font-semibold text-white">
        {truncate(address ?? "", 12, true)}
      </p>
      <IconButton onClick={handleCopy} label="Copy">
        {copied ? (
          <CheckIcon className="text-yellow" />
        ) : (
          <CopyIcon className="text-yellow" />
        )}
      </IconButton>
    </div>
  );
};
