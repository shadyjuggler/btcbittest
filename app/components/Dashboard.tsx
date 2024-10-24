"use client";

import { useAuthContext } from "../context";
import { HomePage } from "./HomePage";
import { CurrencyTable } from "./CurrencyTable";

export const Dashboard: React.FC = () => {
  const { authenticated } = useAuthContext();

  return !authenticated ? <HomePage/> : <CurrencyTable/>; 
}
