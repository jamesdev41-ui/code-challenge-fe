import type { TokenPriceType } from "@types";
import { TOKEN_ICON_BASE_URL } from "./constants";

// Helper function to get token icon URL
export const getTokenIcon = (symbol: string) =>
  `${TOKEN_ICON_BASE_URL}/${symbol}.svg`;

export const getLatestPricesMap = (
  prices: TokenPriceType[],
): Record<string, TokenPriceType> => {
  const priceMap: Record<string, TokenPriceType> = {};

  prices.forEach((price) => {
    const existing = priceMap[price.currency];
    if (
      !existing ||
      new Date(price.date).getTime() > new Date(existing.date).getTime()
    ) {
      priceMap[price.currency] = price;
    }
  });

  return priceMap;
};
