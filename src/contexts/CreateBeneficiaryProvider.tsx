"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

type KeyValue = {
	key: string;
	value: any;
};

type KeyValueContextType = {
	keyValueStore: Record<string, any>;
	setKeyValue: (keyValue: KeyValue) => void;
	getKeyValue: (key: string) => any;
};

const KeyValueContext = createContext<KeyValueContextType | undefined>(
	undefined
);

type KeyValueProviderProps = {
	children: ReactNode;
};

export function KeyValueProvider({ children }: KeyValueProviderProps) {
	const [keyValueStore, setKeyValueStore] = useState<Record<string, any>>({});

	const setKeyValue = ({ key, value }: KeyValue) => {
		setKeyValueStore((prevStore) => ({ ...prevStore, [key]: value }));
	};

	const getKeyValue = (key: string): any => {
		return keyValueStore[key];
	};

	return (
		<KeyValueContext.Provider
			value={{ keyValueStore, setKeyValue, getKeyValue }}
		>
			{children}
		</KeyValueContext.Provider>
	);
}

export const useKeyValue = (): KeyValueContextType => {
	const context = useContext(KeyValueContext);
	if (!context) {
		throw new Error("useKeyValue must be used within a KeyValueProvider");
	}
	return context;
};
