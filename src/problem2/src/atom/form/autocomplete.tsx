import { Autocomplete, TextField } from "@mui/material";
import type { AutocompleteProps, TextFieldProps } from "@mui/material";

type CommonAutocompleteProps<T> = {
  name: string;
  label?: string;
  textFieldProps?: Omit<TextFieldProps, "label">;
  onChange?: (value: T | null) => void;
  error?: string;
} & Omit<AutocompleteProps<T, false, false, false>, "renderInput" | "onChange">;

export const CommonAutocomplete = <T,>({
  label,
  textFieldProps,
  onChange,
  error,
  ref,
  ...props
}: CommonAutocompleteProps<T>) => {
  return (
    <Autocomplete
      {...props}
      onChange={(_, newValue) => {
        // Call custom onChange if provided
        if (onChange) {
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          label={label}
          inputRef={ref}
          error={!!error}
          helperText={error || " "}
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              ...textFieldProps?.InputProps,
            },
          }}
        />
      )}
    />
  );
};
