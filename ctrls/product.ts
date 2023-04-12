import { User } from "firebase/auth";

type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;

export type ProductValue = ExcludeMethods<Omit<Product, "id" | "timestamp">>;

export class Product {
  id: string;
  title: string;
  feature: string;
  youtube: string;
  images: string[];
  price: number;
  req: string;
  desc: string;
  shortdesc: string;
  timestamp: number;
  type: "script" | "props" | "map" | "psd" | "skin";

  constructor(data?: Partial<Product>) {
    this.id = data?.id ?? "";
    this.title = data?.title ?? "";
    this.feature = data?.feature ?? "";
    this.youtube = data?.youtube ?? "";
    this.images = data?.images ?? [];
    this.price = data?.price ?? 0;
    this.req = data?.req ?? "";
    this.desc = data?.desc ?? "";
    this.shortdesc = data?.shortdesc ?? "";
    this.timestamp = data?.timestamp ?? 0;
    this.type = data?.type ?? "script";
  }

  static prefix: string = `${process.env.REACT_APP_PREFIX}`;
  static endpoint(): string {
    return `https://codey.okkc.in/api`;
  }

  static Get() {
    return {
      docs: async (cat: string = "all", limit: number = 6) => {
        return await fetch(
          `${this.endpoint()}/product/${this.prefix}/${cat}/${limit}`
        )
          .then<{ status: number; data: Product[] }>((res) => res.json())
          .then<Product[]>((res) =>
            res.status === 200 ? res.data.map((doc) => new Product(doc)) : []
          );
      },
    };
  }

  static async buy(user: User) {
    const token = await user.getIdToken();
    return await fetch(`${this.endpoint()}/product/buy/${this.prefix}/${token}`)
      .then((res) => res.json())
      .then((res) => res.status === 200);
  }
}
