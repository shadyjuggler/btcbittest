"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CurrencyBalanceData } from "../types/types";
import { TableAPI } from "../types/enums";

import { SlTrash } from "react-icons/sl";

import { ENDPOINTS } from "../config";
import { attachCurrencySymbolToData } from "../utils/attachCurrencySymbol";

import Spinner from "./Spinner";
import { Counter } from "./Counter";

export const CurrencyTable: React.FC = () => {
	const [tableCols, setTableCols] = useState<number>(3);
	const [tableAPI, setTableAPI] = useState(TableAPI.currencies);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [currencyData, setCurrencyData] = useState<CurrencyBalanceData | undefined>(undefined);
	const [currencySearch, setCurrencySearch] = useState<string>();
	const isSmallDevice = () => window.innerWidth <= 768;

	useEffect(() => {
		const http = async () => {
			try {
				const res = await fetch(ENDPOINTS.API + tableAPI);

				if (!res.ok) {
					return undefined;
				}

				const currencyData = await res.json();

				setCurrencyData(attachCurrencySymbolToData(currencyData));
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false)
			}
		};

		setLoading(true);
		http();
	}, [tableAPI])

	const tableHeaders = () => {
		const headerElements = [];

		for (let colIndex = 0; colIndex < tableCols; colIndex++) {
			headerElements.push(
				<div className="w-full grid grid-cols-3 text-xs text-gray-700 px-4 uppercase bg-gray-50" key={colIndex}>
					<div className="justify-self-start self-center">Currency</div>
					<div className="justify-self-center self-center">Amount</div>
					<div className="justify-self-end self-center">Delete</div>
				</div>
			);
		}

		return headerElements;
	};


	const handleColumnsChange = useCallback((columns: String) => {
		const newColumns = Math.max(1, Math.min(isSmallDevice() ? 2 : 4, +columns));
		setTableCols(newColumns);
	}, [isSmallDevice]);

	useEffect(() => {
		handleColumnsChange(`${tableCols}`);
	}, [tableCols]);

	useEffect(() => {
		if (isSmallDevice()) handleColumnsChange("2");
	}, [isSmallDevice, handleColumnsChange]);

	const deleteRow = (symbol: string) => {
		const newCurrencyData = currencyData?.filter(currency => currency.symbol !== symbol);
		setCurrencyData(newCurrencyData);
	};

	const handleCounterClick = (index: number) => {
		handleColumnsChange(`${tableCols + index}`);
	}

	const content = currencyData
		?.filter((curr) => currencySearch ? curr.symbol === currencySearch : curr.symbol)
		.map((curr) => (
			<div
				key={curr.symbol}
				className="bg-white border-b px-6 py-4 font-medium text-gray-900 whitespace-nowrap grid grid-cols-3"
			>
				<div className="justify-self-start">{curr.symbol}</div>
				<div className="justify-self-center">{curr.amount}</div>
				<div className="flex justify-self-end">
					<SlTrash className="cursor-pointer" onClick={() => deleteRow(curr.symbol)} />
				</div>
			</div>
		));

	

	return (
		<>
			<div className="mt-16 flex gap-4">
				<h4 className=" text-2xl font-bold text-gray-900">Balance</h4>
				{isLoading && <Spinner />}
			</div>
			<div className="z-10 w-full items-start justify-between text-sm mt-8 flex">
				<div className="flex w-5/6 flex-col justify-center items-center">
					{(tableAPI === TableAPI.currencies && currencyData) ? (
						<>
							<div
								className={`w-full h-8 bg-gray-800 grid grid-cols-${tableCols} justify-items-center `}
							>
								{tableHeaders()}
							</div>
							<div className={`w-full grid grid-cols-${tableCols}`}>
								{content}
							</div>
						</>
					) : !isLoading ? (
						<div className="w-full p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
							Currencies not found
						</div>
					)
						:
						""
					}
				</div>

				<div className="flex w-1/6 items-end justify-center flex flex-col px-4">


					<p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search for currency</p>
					<div className="max-w-md">
						<div className="relative">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
								</svg>
							</div>
							<input onChange={(e) => setCurrencySearch(e.target.value.toUpperCase())} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Currency Code..." required />
						</div>
					</div>

					<p className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select API</p>
					<div className="max-w-sm">
						<select onChange={() => setTableAPI(tableAPI === TableAPI.currencies ? TableAPI.notFound : TableAPI.currencies)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option value={TableAPI.currencies}>{TableAPI.currencies}</option>
							<option value={TableAPI.notFound}>{TableAPI.notFound}</option>
						</select>
					</div>


					<p className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columns:</p>
					{/* the issue is with e.target element */}
					{/* @ts-ignore */}
					<Counter onIncrease={() => handleCounterClick(1)} value={tableCols} onDecrease={() => handleCounterClick(-1)} onValueChange={(e) => handleColumnsChange(e.target.value)} />

				</div>
			</div>
		</>
	);
}
