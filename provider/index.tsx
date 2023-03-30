import { createTheme, ThemeProvider } from "@mui/material";
import { FirebaseApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useReducer } from "react";
import { MainContext, MainState } from "./state";

export * from "./state";

export type ProviderProps = {
  children?: ReactNode;
  app: FirebaseApp;
  prefix: string;
};

export const Provider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(MainState.reducer, new MainState());
  const theme = createTheme();

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
    <MainContext.Provider value={{ state, dispatch, prefix: props.prefix }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MainContext.Provider>
  );
};
