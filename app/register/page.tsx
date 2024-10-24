"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context";
import { RegFormData } from "../types/types";
import { ENDPOINTS } from "../config";
import { validateForm, validatePasswordMatch } from "../utils/validation";
import Spinner from "../components/Spinner";

export default function SignUp() {
  const [RegFormData, setRegFormData] = useState<RegFormData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();
  const { authenticated, setAuthenticated } = useAuthContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setErrorMessage("");
    setLoading(true);

    if (validateForm(setErrorMessage, RegFormData) && validatePasswordMatch(RegFormData, setErrorMessage)) {
      try {
        const data = await fetch(ENDPOINTS.REGISTER, {
          method: "POST",
          body: JSON.stringify(RegFormData),
        }).then(resp => resp.json())

        if (data.message) {
          setErrorMessage(data.message);
        }
        if (data.success) {
          setAuthenticated(true);
          setTimeout(() => {
            setLoading(false);
            router.push("/");

          }, 1000);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setLoading(false)
    }
  };


  return (
    <main className="mx-auto  max-w-7xl px-4 sm:px-6 sm:py-32 lg:px-8">

      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Register</h2>
        {
          errorMessage && (
            <div className="flex items-center mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div> {errorMessage} </div>
            </div>
          )
        }
        <div className="mt-4 pb-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt2">
            <input
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              onChange={(e) =>
                setRegFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              onChange={(e) =>
                setRegFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm password
          </label>
          <div className="mt-2">
            <input
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              onChange={(e) =>
                setRegFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {isLoading && <Spinner />}
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onSubmit}
            >
              Enter
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
