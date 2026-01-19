import { WALLET_STORE, SIMULATED_DELAY } from "@common";
import type { WalletType } from "@types";

export const walletService = {
  init: () => {
    const initData = { USD: 100000000 };

    const storedData = localStorage.getItem(WALLET_STORE);
    if (!storedData) {
      localStorage.setItem(WALLET_STORE, JSON.stringify(initData));
    }
    return initData;
  },

  getWallets: async (): Promise<WalletType[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

    const storedData = localStorage.getItem(WALLET_STORE);
    const walletData: Record<string, number> =
      storedData && storedData.length > 2
        ? (JSON.parse(storedData) as Record<string, number>)
        : walletService.init();

    return Object.keys(walletData)
      .map((key) => ({
        currency: key,
        amount: walletData[key],
      }))
      .filter((wallet) => wallet.amount > 0);
  },

  getBalance: (currency: string): number => {
    const storedData = localStorage.getItem(WALLET_STORE);
    const walletData: Record<string, number> = storedData
      ? (JSON.parse(storedData) as Record<string, number>)
      : walletService.init();
    return walletData[currency] || 0;
  },

  exchangeWallet: async (
    fromCurrency: string,
    toCurrency: string,
    fromAmount: number,
    toAmount: number,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

    const storedData = localStorage.getItem(WALLET_STORE);
    const walletData: Record<string, number> = storedData
      ? (JSON.parse(storedData) as Record<string, number>)
      : walletService.init();
    const currentFromAmount = walletData[fromCurrency] || 0;
    if (currentFromAmount < fromAmount) {
      throw new Error("Insufficient funds");
    }
    walletData[fromCurrency] -= fromAmount;
    walletData[toCurrency] = (walletData[toCurrency] || 0) + toAmount;

    localStorage.setItem(WALLET_STORE, JSON.stringify(walletData));
  },
};
