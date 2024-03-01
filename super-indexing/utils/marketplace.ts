import { MarketplaceName } from "@/types";

export const getMarketplaceIconUri = (market: MarketplaceName) => {
  switch (market) {
    case "magic_eden":
      return "./magic-eden.png";
    case "tensor":
      return "./tensor.png";
    case "sniper":
      return "./sniper.png";
  }
};

export const getMarketplaceName = (market: MarketplaceName) => {
  switch (market) {
    case "magic_eden":
      return "Magic Eden";
    case "tensor":
      return "Tensor";
    case "sniper":
      return "Sniper";
  }
};
