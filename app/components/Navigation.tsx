"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SlHome } from "react-icons/sl";
import { useAuthContext } from "../context";
import { Disclosure } from "@headlessui/react";

export function Navigation() {
  const { authenticated, setAuthenticated } = useAuthContext();

  return (
    <Disclosure as="nav" className="bg-gray-800 w-screen absolute z-30">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!authenticated ?
              <>
                <a
                  href="/register"
                  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </a>

                <a href="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </a>
              </>
              :
              <button 
                onClick={() => setAuthenticated(false)}
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logout
              </button>
            }
          </div>
        </div>
      </div>
    </Disclosure>
    // <nav className="z-10 fixed m-auto w-full h-16 bottom-0 right-0 left-0 p-2 bg-gray-900">
    //   <ul className="flex gap-2 h-full justify-center md:justify-end">
    //     {!authenticated ? (
    //       <>
    //         <li className="w-1/3 md:w-[160px] bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold flex justify-center items-center">
    //           <Link
    //             className={`link w-full h-full flex justify-center items-center ${
    //               pathname === "/sign_in" ? "active" : ""
    //             }`}
    //             href="/sign_in"
    //           >
    //             SIGN IN
    //           </Link>
    //         </li>
    //         <li className="w-1/3 md:w-[160px] bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold flex justify-center items-center">
    //           <Link
    //             className={`link w-full h-full flex justify-center items-center ${
    //               pathname === "/sign_up" ? "active" : ""
    //             }`}
    //             href="/sign_up"
    //           >
    //             SIGN UP
    //           </Link>
    //         </li>
    //       </>
    //     ) : (
    //       <li className="w-2/3 md:w-[160px] flex justify-center items-center bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold">
    //         <button
    //           className="flex justify-center items-center w-full h-full"
    //           onClick={() => setAuthenticated(false)}
    //         >
    //           SIGN OUT
    //         </button>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
}
