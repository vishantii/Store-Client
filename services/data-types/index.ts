export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  name: string;
  status: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BankTypes {
  _id: string;
  bankName: string;
  accountNumber: string;
  name: string;
}

export interface PaymentTypes {
  _id: string;
  status: string;
  type: string;
  bank: BankTypes[];
}

export interface NominalsTypes {
  coinName: string;
  coinQuantity: number;
  price: number;
  _id: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}
export interface UserTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}
export interface JWTPayloadTypes {
  player: UserTypes;
  iat: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  accountNumber: string;
  type: string;
}

export interface HistoryVoucherTopup {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: string;
  thumbnail: string;
}

export interface HistoryTransactionTypes {
  _id: string;
  historyVoucherTopup: HistoryVoucherTopup;
  value: number;
  status: string;
  accountUser: string;
  tax: number;
  name: string;
  historyPayment: HistoryPaymentTypes;
}

export interface TopUpCategoriesTypes {
  _id: string;
  value: number;
  name: string;
}
