import { TokenAvatar } from "@atom";
import { useExchangeModal } from "@contexts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";

interface WalletCardProps {
  currency: string;
  amount: number;
}

export const WalletCard = React.memo(
  ({ currency, amount }: WalletCardProps) => {
    const { openModal } = useExchangeModal();

    const handleExchangeClick = () => {
      openModal(currency);
    };

    const formattedAmount = useMemo(
      () =>
        amount.toLocaleString(undefined, {
          maximumFractionDigits: 6,
        }),
      [amount],
    );

    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TokenAvatar token={currency} size={40}/> &nbsp;
            <Typography variant="h6">{currency}</Typography>
          </Box>
          <Typography variant="body2">
            {`Your current balance in the wallet `}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {formattedAmount} {currency}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleExchangeClick}>
            Exchange Now
          </Button>
        </CardActions>
      </Card>
    );
  },
);
