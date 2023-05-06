import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { CDate } from "./main";
import { Product } from "./product";

//SECTION - Transaction
export class Transaction {
  id: string;
  label: string;
  path: string;
  ref: string;
  refid: string;
  timestamp: number;
  type: "product" | "topup" | "ip";
  user: string;
  value: number;

  constructor(data?: Partial<Transaction>) {
    this.id = data?.id ?? "";
    this.label = data?.label ?? "";
    this.path = data?.path ?? "";
    this.ref = data?.ref ?? "";
    this.refid = data?.refid ?? "";
    this.timestamp = CDate.toNumber(data?.timestamp);
    this.type = data?.type ?? "product";
    this.user = data?.user ?? "";
    this.value = data?.value ?? 0;
  }
}
//!SECTION

//SECTION - CartItem
export class CartItem {
  id: string;
  refid: string;
  feature: string;
  label: string;
  price: number;
  amount: number;
  user: string;

  constructor(data?: Partial<CartItem>) {
    this.id = data?.id ?? "";
    this.refid = data?.refid ?? "";
    this.feature = data?.feature ?? "";
    this.label = data?.label ?? "";
    this.price = data?.price ?? 0;
    this.amount = data?.amount ?? 1;
    this.user = data?.user ?? "";
  }

  val(): unknown {
    return Object.entries(this)
      .filter(
        ([key, value]) =>
          value instanceof Function === false && ["id"].includes(key) === false
      )
      .reduce((data, [key, value]) => Object.assign(data, { [key]: value }), {
        timestamp: serverTimestamp(),
      });
  }

  static prefix: string = `${process.env.REACT_APP_PREFIX}`;
  static collection() {
    return collection(db, "store", this.prefix, "cart");
  }
  static doc(id: string) {
    return doc(db, "store", this.prefix, "cart", id);
  }

  static async add(user: User, item: Product) {
    if (user.uid) {
      const { id, title, feature, price } = item;
      const data = new CartItem({
        label: title,
        refid: id,
        user: user.uid,
        feature,
        price,
        amount: 1,
      });
      await addDoc(this.collection(), data.val());
    }
  }

  static async remove(user: User, item: CartItem) {
    if (user.uid && item.id) {
      await deleteDoc(this.doc(item.id));
    }
  }
}
//!SECTION

//SECTION - CUser
export class CUser {
  loading: boolean;
  transactions: Transaction[];
  cart: CartItem[];

  constructor(data?: Partial<CUser>) {
    this.loading = data?.loading ?? true;
    this.transactions = data?.transactions ?? [];
    this.cart = data?.cart ?? [];
  }

  trans() {
    return {
      sum: (): number =>
        this.transactions.reduce((total, item) => total + item.value, 0),
      isPurchase: (id: string): boolean =>
        this.transactions.findIndex((item) => item.refid === id) > -1,
    };
  }

  Cart() {
    return {
      sum: (): number =>
        this.cart.reduce((total, cart) => total + cart.amount * cart.price, 0),
      added: (id: string): boolean =>
        this.cart.findIndex((c) => c.refid === id) > -1,
      remove: async (user: User, doc: Product) => {
        const cart = this.cart.find((c) => c.refid === doc.id);
        if (cart) {
          await CartItem.remove(user, cart);
        }
      },
    };
  }

  static prefix: string = `${process.env.REACT_APP_PREFIX}`;
  static collection() {
    return collection(db, "store", this.prefix, "transactions");
  }

  static watch(user: User, callback: (userdata: CUser) => void): Unsubscribe {
    let userdata = new CUser();
    const unwatchTransaction = onSnapshot(
      query(this.collection(), where("user", "==", user.uid)),
      (snapshot) => {
        const transactions = snapshot.docs.map(
          (doc) =>
            new Transaction({
              ...doc.data(),
              id: doc.id,
            })
        );
        userdata = new CUser({ ...userdata, transactions });
        callback(userdata);
      }
    );
    const unwatchCart = onSnapshot(
      query(CartItem.collection(), where("user", "==", user.uid)),
      (snapshot) => {
        const cart = snapshot.docs.map(
          (doc) => new CartItem({ ...doc.data(), id: doc.id })
        );
        userdata = new CUser({ ...userdata, cart });
        callback(userdata);
      }
    );
    return () => {
      unwatchTransaction();
      unwatchCart();
    };
  }
}
//!SECTION
