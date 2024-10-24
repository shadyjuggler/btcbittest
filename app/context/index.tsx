"use client";

import { useContext, useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";

interface AuthContextInterface {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextInterface>({
  authenticated: false,
  setAuthenticated: () => {}, 
});


export function AuthContextProvider({children}: {children: ReactNode}) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const value: AuthContextInterface = { authenticated, setAuthenticated};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextInterface {
  return useContext(AuthContext);
}
