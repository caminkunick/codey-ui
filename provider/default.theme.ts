import { PaletteColor, PaletteColorOptions, ThemeOptions } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: PaletteColor;
  }
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const defaultTheme = (dark: boolean = false): ThemeOptions => ({
  palette: {
    neutral: {
      main: blueGrey[800],
      contrastText: "#FFFFFF",
    },
    mode: dark ? "dark" : "light",
  },
});
