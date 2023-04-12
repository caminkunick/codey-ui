import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { User } from "firebase/auth";
import { createContext, Dispatch, ReactNode, useContext } from "react";
import { CUser } from "../ctrls/cuser";

export type ProviderProps = {
  children?: ReactNode;
  app: FirebaseApp;
  prefix: string;
  menu?: Record<"label" | "url", string>[];
};

export type CartItemType = {
  id: string;
  feature: string;
  label: string;
  price: number;
  amount: number;
};
export type MainStateAction =
  | { type: "app"; value: FirebaseApp }
  | { type: "user"; value: User | null }
  | { type: "userdata"; value: CUser }
  | { type: "reset" };

export class MainState {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  loading: boolean;
  user: User | null;
  userdata: CUser;

  constructor(data?: Partial<MainState>) {
    this.app = data?.app ?? null;
    this.db = data?.db ?? null;
    this.auth = data?.auth ?? null;
    this.loading = data?.loading ?? true;
    this.user = data?.user ?? null;
    this.userdata = data?.userdata ?? new CUser();
  }

  static reducer(s: MainState, action: MainStateAction): MainState {
    switch (action.type) {
      case "app":
        return new MainState({
          ...s,
          app: action.value,
          db: getFirestore(action.value),
          auth: getAuth(action.value),
        });
      case "user":
        return new MainState({ ...s, loading: false, user: action.value });
      case "userdata":
        return new MainState({ ...s, userdata: action.value });
      case "reset":
        return new MainState();
      default:
        return s;
    }
  }
}

export const MainContext = createContext<
  Omit<ProviderProps, "children" | "app"> & {
    state: MainState;
    dispatch: Dispatch<MainStateAction>;
    prefix: string;
  }
>({
  state: new MainState(),
  dispatch: () => {},
  prefix: "",
});

export const useStore = () => useContext(MainContext);
