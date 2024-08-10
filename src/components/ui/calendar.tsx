"use client";

import { buttonVariants } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import "@radix-ui/react-select";
import { format, setMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center relative items-center ",
				caption_label: "text-sm font-bold hidden ",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-10 w-10 p-0 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1 font-bold",
				nav_button_next: "absolute right-1 font-bold",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell:
					"text-muted-foreground rounded-md w-9 font-bold text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-semibold aria-selected:opacity-100 "
				),
				day_range_end: "day-range-end",
				day_selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
				day_today: "bg-accent text-accent-foreground",
				day_outside:
					"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
				day_disabled: "text-muted-foreground opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				caption_dropdowns:
					"flex items-center ml-4 mr-6 gap-2 font-bold",
				...classNames,
			}}
			components={{
				IconLeft: () => <ChevronLeft className="h-4 w-4" />,
				IconRight: () => <ChevronRight className="h-4 w-4" />,
				Dropdown: (props) => {
					const {
						fromDate,
						fromMonth,
						fromYear,
						toDate,
						toMonth,
						toYear,
					} = useDayPicker();
					const { goToMonth, currentMonth } = useNavigation();

					if (props.name === "months") {
						const selectItems = Array.from(
							{ length: 12 },
							(_, i) => ({
								value: i.toString(),
								label: format(setMonth(new Date(), i), "MMM"),
							})
						);
						return (
							<Select
								onValueChange={(newValue) => {
									const newDate = new Date(currentMonth);
									newDate.setMonth(parseInt(newValue));
									goToMonth(newDate);
								}}
								value={props.value?.toString()}
							>
								<SelectTrigger>
									{format(currentMonth, "MMM")}
								</SelectTrigger>
								<SelectContent>
									{selectItems.map((selectItem) => (
										<SelectItem
											key={selectItem.value}
											value={selectItem.value}
										>
											{selectItem.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						);
					} else if (props.name === "years") {
						const earliestYear =
							fromYear ||
							fromMonth?.getFullYear() ||
							fromDate?.getFullYear();

						const latestYear =
							toYear ||
							toMonth?.getFullYear() ||
							toDate?.getFullYear();

						let selectItems: { value: string; label: string }[] =
							[];

						if (earliestYear && latestYear) {
							const yearsLength = latestYear - earliestYear + 1;
							selectItems = Array.from(
								{ length: yearsLength },
								(_, i) => ({
									value: (earliestYear + i).toString(),
									label: (earliestYear + i).toString(),
								})
							);
						}

						return (
							<Select
								onValueChange={(newValue) => {
									const newDate = new Date(currentMonth);
									newDate.setFullYear(parseInt(newValue));
									goToMonth(newDate);
								}}
								value={props.value?.toString()}
							>
								<SelectTrigger>
									{currentMonth.getFullYear()}
								</SelectTrigger>
								<SelectContent>
									{selectItems.map((selectItem) => (
										<SelectItem
											key={selectItem.value}
											value={selectItem.value}
										>
											{selectItem.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						);
					}
					return null;
				},
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
