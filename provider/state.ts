import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { User } from "firebase/auth";
import { createContext, Dispatch, useContext } from "react";
import { Product } from "ctrls/product";
import { CUser } from "ctrls/cuser";

export type CartItem = {
  id: string;
  feature: string;
  label: string;
  price: number;
  amount: number;
};
export type MainStateAction =
  | { type: "app"; value: FirebaseApp }
  | { type: "user"; value: User | null }
  | { type: "cart-add"; value: Product }
  | { type: "cart-rem" | "cart-inc" | "cart-dec"; value: string }
  | { type: "userdata"; value: CUser };

export class MainState {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  loading: boolean;
  user: User | null;
  cart: CartItem[];
  userdata: CUser;

  constructor(data?: Partial<MainState>) {
    this.app = data?.app ?? null;
    this.db = data?.db ?? null;
    this.auth = data?.auth ?? null;
    this.loading = data?.loading ?? true;
    this.user = data?.user ?? null;
    this.cart = data?.cart ?? [];
    this.userdata = data?.userdata ?? new CUser();
  }

  Cart() {
    return {
      add: (value: Product): MainState => {
        const index = this.cart.findIndex((c) => c.id === value.id);
        if (index > -1) {
          this.cart[index].amount += 1;
        } else {
          this.cart = this.cart.concat({
            id: value.id,
            feature: value.feature,
            label: value.title,
            price: value.price,
            amount: 1,
          });
        }
        return new MainState(this);
      },
      rem: (id: string): MainState => {
        this.cart = this.cart.filter((c) => c.id !== id);
        return new MainState(this);
      },
      inc: (id: string): MainState => {
        this.cart = this.cart.map((c) => {
          if (c.id === id) {
            c.amount += 1;
          }
          return c;
        });
        return new MainState(this);
      },
      dec: (id: string): MainState => {
        const index = this.cart.findIndex((c) => c.id === id);
        if (index > -1) {
          if (this.cart[index].amount < 2) {
            this.cart.splice(index, 1);
          } else {
            this.cart[index].amount -= 1;
          }
        }
        return new MainState(this);
      },
      amount: (): number =>
        this.cart.reduce((num, cart) => num + cart.amount, 0),
      sum: (): number =>
        this.cart.reduce((sum, cart) => sum + cart.amount * cart.price, 0),
    };
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
      case "cart-add":
        return s.Cart().add(action.value);
      case "cart-rem":
        return s.Cart().rem(action.value);
      case "cart-inc":
        return s.Cart().inc(action.value);
      case "cart-dec":
        return s.Cart().dec(action.value);
      case "userdata":
        return new MainState({ ...s, userdata: action.value });
      default:
        return s;
    }
  }
}

export const MainContext = createContext<{
  state: MainState;
  dispatch: Dispatch<MainStateAction>;
  prefix: string;
}>({
  state: new MainState(),
  dispatch: () => {},
  prefix: "",
});

export const useStore = () => useContext(MainContext);
