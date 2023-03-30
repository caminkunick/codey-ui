import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useReducer } from "react";
import { MainContext, MainState } from "./state";

export * from "./state";

export type ProviderProps = {
  children?: ReactNode;
};

export const Provider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(MainState.reducer, new MainState());
  const theme = createTheme();

  useEffect(() => {}, []);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MainContext.Provider>
  );
};
