export type MarketplaceName = "magic_eden" | "tensor" | "sniper";

export type NFTActivity = {
  program: MarketplaceName;
  activity: "LIST" | "BID";
  date: string;
  nft: string;
  hash: string;
};
