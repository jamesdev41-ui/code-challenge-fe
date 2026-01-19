import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { walletService } from "@api";
import type { WalletType } from "@types";
import { queryConfig } from "@common";

export const walletQueryKeys = {
  all: ["wallets"] as const,
};

export const useWallets = () => {
  return useQuery<WalletType[]>({
    ...queryConfig,
    queryKey: walletQueryKeys.all,
    queryFn: () => walletService.getWallets(),
  });
};

interface ExchangeWalletParams {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

export const useExchangeWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ExchangeWalletParams) => {
      await walletService.exchangeWallet(
        params.fromCurrency,
        params.toCurrency,
        params.fromAmount,
        params.toAmount,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletQueryKeys.all });
    },
  });
};
