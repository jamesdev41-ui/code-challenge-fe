import { Typography, Grid, Box, Button, styled } from "@mui/material";
import { useExchangeModal } from "@contexts";
import { useWallets } from "@api";

export const AppHeader = () => {
  const { openModal } = useExchangeModal();

  const { data: wallets } = useWallets();

  return (
    <AppHeaderStyled>
      <Grid
        container
        spacing={{ xs: 3 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
      >
        <Grid size={{ xs: 1, sm: 1, md: 2 }}>
          <Typography variant="h4" component="h1" textAlign="center">
            My Wallet
          </Typography>
          <Typography variant="h4" component="h1" textAlign="center">
            {wallets &&
              wallets.length > 0 &&
              `(${wallets.length} ${wallets.length > 1 ? "currencies" : "currency"})`}
          </Typography>
        </Grid>
        <Grid size={{ xs: 1, sm: 1, md: 2 }} textAlign="center">
          <Button variant="contained" onClick={() => openModal()}>
            Exchange
          </Button>
        </Grid>
      </Grid>
    </AppHeaderStyled>
  );
};

const AppHeaderStyled = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1000,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  backgroundColor: theme.palette.background.paper,
}));
