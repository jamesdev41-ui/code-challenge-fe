import { getLatestPricesMap } from "@common";
import type { TokenPriceType } from "@types";
import { useCallback, useEffect, useMemo } from "react";
import type { useExchangeForm } from "./hooks";
import { useExchangeModal } from "@contexts";
import {
  CommonAutocomplete,
  CommonNumberInput,
  TokenAvatar,
  TokenOption,
} from "@atom";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface ExchangeFormProps {
  prices: TokenPriceType[];
  formData: ReturnType<typeof useExchangeForm>;
}

export const ExchangeForm = ({ prices, formData }: ExchangeFormProps) => {
  const pricesMap = useMemo(() => getLatestPricesMap(prices), [prices]);

  const { isOpen, selectedCurrency } = useExchangeModal();

  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    formError,
    handleAmountChange,
    handleSubmit,
    swapTokens,
    handleAllToken,
    handleTokenChange,
  } = formData;

  const tokenOptions = Object.keys(pricesMap);

  const renderTokenOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement> & { key: string },
      option: string,
    ) => {
      const { key, ...rest } = props;
      return <TokenOption key={key} option={option} {...rest} />;
    },
    [],
  );

  useEffect(() => {
    // Set fromToken when modal opens with selectedCurrency
    if (isOpen && selectedCurrency) {
      handleTokenChange("fromToken", selectedCurrency);
    }
    // handleToken changed after fromToken is set, not in dependency array cause bug set from token wrongly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedCurrency]);
  return (
    <Box>
      <Grid container spacing={3}>
        {/* From Section */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              From{" "}
              {fromToken && (
                <Chip
                  label="Swap all"
                  sx={{ ml: 1 }}
                  onClick={handleAllToken}
                />
              )}
            </Typography>
            <CommonAutocomplete
              name="fromToken"
              label="Select Token"
              options={tokenOptions.filter((tkn) => tkn !== toToken)}
              renderOption={renderTokenOption}
              onChange={(value) => handleTokenChange("fromToken", value)}
              value={fromToken}
              error={formError?.fromToken}
              textFieldProps={{
                InputProps: {
                  startAdornment: fromToken && (
                    <TokenAvatar token={fromToken} />
                  ),
                },
              }}
            />
            <CommonNumberInput
              name="fromAmount"
              label="Amount"
              type="number"
              onChange={(e) => {
                handleAmountChange("fromAmount", e.target.value ?? 0);
              }}
              error={!!formError?.fromAmount}
              helperText={formError?.fromAmount}
              value={fromAmount ?? ""}
              slotProps={{
                htmlInput: { min: 0 },
              }}
            />
          </Stack>
        </Grid>

        {/* Swap Icon - Visual indicator only */}
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{
            display: { xs: "flex" },
            justifyContent: "center",
            alignItems: "center",
            pt: 5,
          }}
        >
          <IconButton onClick={swapTokens}>
            <SwapHorizIcon sx={{ fontSize: 32, color: "text.secondary" }} />
          </IconButton>
        </Grid>

        {/* To Section */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              To
            </Typography>
            <CommonAutocomplete
              name="toToken"
              label="Select Token"
              options={tokenOptions.filter((tkn) => tkn !== fromToken)}
              onChange={(value) => handleTokenChange("toToken", value)}
              renderOption={renderTokenOption}
              value={toToken}
              error={formError?.toToken}
              textFieldProps={{
                InputProps: {
                  startAdornment: toToken && <TokenAvatar token={toToken} />,
                },
              }}
            />
            <CommonNumberInput
              name="toAmount"
              label="Amount"
              type="number"
              value={toAmount ?? ""}
              error={!!formError?.toAmount}
              helperText={formError?.toAmount}
              onChange={(e) => {
                handleAmountChange("toAmount", e.target.value ?? 0);
              }}
              slotProps={{
                htmlInput: { min: 0 },
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 4 }}
        onClick={() =>
          handleSubmit({
            fromToken,
            toToken,
            fromAmount: +fromAmount,
            toAmount: +toAmount,
          })
        }
      >
        Swap Tokens
      </Button>
    </Box>
  );
};
