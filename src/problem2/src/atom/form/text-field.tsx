import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export const CommonNumberInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      sx={{
        // Hide arrows for Chrome, Safari, Edge, Opera
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
        // Hide arrows for Firefox
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
      }}
    />
  );
};
