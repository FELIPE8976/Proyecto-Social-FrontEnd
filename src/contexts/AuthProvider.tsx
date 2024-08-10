"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

// Define the shape of the context
type AuthContextType = {
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	isAuthenticated: boolean; // Add new value here
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
	children: ReactNode;
}

// AuthProvider component to wrap your app with
export function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState<string>(() => {
		// Check if localStorage is defined before trying to use it
		if (typeof localStorage !== "undefined") {
			// Retrieve token from localStorage, if exists
			return localStorage.getItem("token") || "";
		}
		return "";
	});

	// Update localStorage whenever token changes
	useEffect(() => {
		// Check if localStorage is defined before trying to use it
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("token", token);
		}
	}, [token]);

	// Value object to provide through context
	const value = {
		token,
		setToken,
		isAuthenticated: !!token, // Calculate isAuthenticated based on token
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

// Custom hook to consume the context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
