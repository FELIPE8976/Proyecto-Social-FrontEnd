export function HouseRoof() {
	return (
		<div className="h-18 relative flex w-[85%] flex-row bg-[#F1EEEE]">
			<div className="absolute left-1/2 top-[-10%] z-0 h-32 w-[50%] -translate-x-1/2 transform rounded-tl-full rounded-tr-full bg-white pt-20" />
			<div className="z-2 h-24 w-[50%] -skew-y-[14deg] rounded-l-2xl bg-accent" />
			<div className="z-1 h-24 w-[50%] skew-y-[14deg] rounded-r-2xl bg-accent" />
		</div>
	);
}
