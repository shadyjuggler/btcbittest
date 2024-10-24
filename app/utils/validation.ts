import { Dispatch } from "react";
import { RegFormData, LogFormData, CurrencyBalanceData } from "../types/types";
import { SetStateAction } from "react";

export const validateForm = (
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
    formData?: RegFormData | LogFormData
  ) => {
    let formIsValid = true;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email) {
      setErrorMessage("Email is required");
      formIsValid = false;
    } else if (!emailRegex.test(formData.email)) {
      setErrorMessage("Invalid email format");
      formIsValid = false;
    }
  
    if (!formData?.password) {
      setErrorMessage("Password is required");
      formIsValid = false;
    } else if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      formIsValid = false;
    }
  
    return formIsValid;
};


export const validatePasswordMatch = (RegFormData: RegFormData | undefined, setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
    if (RegFormData?.password === RegFormData?.confirmPassword)
        return true;
    setErrorMessage("Passwords don't match");
    return false;
};
