type Payment = {
  amount: number;
  currency: string;
  currencySymbol: string;
  date: string;
  description: string;
};

//T - это любой тип
//keyof - возвращает список ключей объекта
type ObjectKey<T> = keyof T;

type PaymentKeys = ObjectKey<Payment>; //"amount" | "currency" | "currencySymbol" | "date"

const pKey: PaymentKeys = "currency";

// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
// useState<string>(initialState: string) => [a, setA]

// use
