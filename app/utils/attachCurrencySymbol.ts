import { CurrencyBalanceData } from "../types/types";
import { CURRENCY_DICTIONARY } from "../config";



export const attachCurrencySymbolToData = (balanceData: CurrencyBalanceData) => {
  return balanceData?.map((balanceItem) => {
    const currId = balanceItem.currencyId;
    const currSymbol = CURRENCY_DICTIONARY[currId] || "Currency not found";

    return { ...balanceItem, symbol: currSymbol };
  });
};
