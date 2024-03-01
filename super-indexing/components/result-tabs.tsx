import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import NFTTable from "./nft-table";
import { NFTActivity } from "@/types";

export default function ResultTabs({
  activities,
  loading,
}: {
  activities: NFTActivity[];
  loading: boolean;
}) {
  const [tab, setTab] = useState("marketplace");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-5">
      <TabsList
        style={{
          boxShadow: "rgba(145, 158, 171, 0.6) 0px -2px 0px 0px inset",
        }}
        className="w-full"
      >
        <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        <TabsTrigger value="nft-fi">NFT-Fi</TabsTrigger>
        <TabsTrigger value="defi">De-Fi</TabsTrigger>
      </TabsList>
      <TabsContent value="marketplace">
        <NFTTable activities={activities} loading={loading} />
      </TabsContent>
      <TabsContent value="nft-fi">
        <ComingSoon />
      </TabsContent>
      <TabsContent value="defi">
        <ComingSoon />
      </TabsContent>
    </Tabs>
  );
}

const ComingSoon = () => (
  <div className="p-6">
    <p className="text-xl text-white">Coming soon</p>
  </div>
);
