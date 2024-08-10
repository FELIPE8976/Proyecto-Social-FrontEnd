import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	valid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, valid = true, ...props }, ref) => {
		const baseClasses =
			"flex h-16 w-full rounded-xl border-[2px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
		const errorClasses =
			"border-destructive text-destructive placeholder:text-destructive focus:border-destructive";
		const classes = valid ? baseClasses : `${baseClasses} ${errorClasses}`;

		return (
			<input
				type={type}
				className={cn(classes, className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
