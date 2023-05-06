import { Timestamp } from "firebase/firestore";

export class CDate {
  static toNumber(date?: Timestamp | number) {
    if (date instanceof Timestamp) {
      return date.toMillis();
    } else if (typeof date === "number") {
      return date;
    } else {
      return Date.now();
    }
  }
}
