import { createTheme, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { defaultTheme } from "./default.theme";
import { MainContext, MainState, ProviderProps } from "./state";

export * from "./state";

export const Provider = ({ children, ...props }: ProviderProps) => {
  const [state, dispatch] = useReducer(MainState.reducer, new MainState());
  const theme = createTheme(defaultTheme());

  useEffect(() => {
    dispatch({ type: "app", value: props.app });
  }, [props.app]);

  useEffect(() => {
    if (state.auth) {
      return onAuthStateChanged(state.auth, (user) => {
        dispatch({ type: "user", value: user });
      });
    }
  }, [state.auth]);

  return (
    <MainContext.Provider value={{ ...props, state, dispatch, prefix: props.prefix }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MainContext.Provider>
  );
};
