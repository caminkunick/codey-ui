import { User } from "firebase/auth";
import { createContext, Dispatch, useContext } from "react";

export type CartItem = {
  id: string;
  feature: string;
  label: string;
  price: number;
  amount: number;
};
export type MainStateAction =
  | { type: "user"; value: User | null }
  | { type: "cart-add"; value: CartItem }
  | { type: "cart-rem" | "cart-inc" | "cart-dec"; value: string };

export class MainState {
  loading: boolean;
  user: User | null;
  cart: CartItem[];

  constructor(data?: Partial<MainState>) {
    this.loading = data?.loading ?? true;
    this.user = data?.user ?? null;
    this.cart = data?.cart ?? [];
  }

  Cart() {
    return {
      add: (value: CartItem): MainState => {
        const index = this.cart.findIndex((c) => c.id === value.id);
        if (index > -1) {
          this.cart[index].amount += 1;
        } else {
          this.cart = this.cart.concat(value);
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
      default:
        return s;
    }
  }
}

export const MainContext = createContext<{
  state: MainState;
  dispatch: Dispatch<MainStateAction>;
}>({
  state: new MainState(),
  dispatch: () => {},
});

export const useStore = () => useContext(MainContext);