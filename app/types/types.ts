export type CurrencyBalanceData = { amount: string, updatedAt: string, currencyId: string, symbol: string}[] | undefined;

export type RegFormData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type LogFormData = {
  email?: string;
  password?: string;
};

