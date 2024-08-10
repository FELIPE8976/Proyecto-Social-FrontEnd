export const fetcher = (url: string, options: any = {}) =>
	fetch(url, options)
		.then((r) => r.json())
		.then((data) => data);
