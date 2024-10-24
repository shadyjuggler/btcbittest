"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context";
import { LogFormData } from "../types/types";
import { AuthStage } from "../types/enums";
import { validateForm } from "../utils/validation";
import { ENDPOINTS } from "../config";
import Spinner from "../components/Spinner";

export default function SignIn() {
  const router = useRouter();
  const [loginStage, setAuthStage] = useState(AuthStage.credentials);
  const [LogFormData, setLogFormData] = useState<LogFormData>();
  const [OTPData, setOTPData] = useState<string>();
  const [loginMessage, setLoginMessage] = useState<string>();
  const { authenticated, setAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setLoginMessage("");
    if (validateForm(setLoginMessage, LogFormData)) {
      try {
        const loginResponse = await fetch(ENDPOINTS.LOGIN, {
          method: "POST",
          body: JSON.stringify(LogFormData),
        });
        const data = await loginResponse.json();

        if (data.message) setLoginMessage(data.message);
        if (data.success) setAuthStage(AuthStage.OTP);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendOTP = async () => {
    setLoginMessage("");
    if (validateOTPData()) {
      setIsLoading(true);
      const serverResponse = await imitateServerInteraction();
      setAuthenticated(serverResponse);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };

  const imitateServerInteraction = async () => {
    const promise = await new Promise((resolve) => setTimeout(resolve, 3000));
    return true;
  };

  const validateOTPData = () => {
    let isValid = true;

    // Validate OTP
    if (!OTPData) {
      setLoginMessage("One-time password is required.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <main className="mx-auto  max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div>
        {loginStage === AuthStage.credentials && !authenticated && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>
            {loginMessage && (
              <div className="flex items-center mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div> {loginMessage} </div>
              </div>
            )}
            <div className="mt-4 pb-12">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  onChange={(e) =>
                    setLogFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="password"
                  onChange={(e) =>
                    setLogFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={login}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Enter
                </button>
              </div>
            </div>
          </>
        )}
        {loginStage === AuthStage.OTP && !authenticated && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>
            <div className=" pb-12">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                OTP Code
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="password"
                onChange={(e) => setOTPData(e.target.value)}
              />
              <div className="mt-6 flex flex-row items-center justify-end gap-x-6">
                {isLoading && <Spinner />}
                <button
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={sendOTP}
                >
                  Enter
                </button>
              </div>
            </div>

          </>
        )}
      </div>

    </main >

  );
}
