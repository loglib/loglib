/* eslint-disable @typescript-eslint/no-explicit-any */
export const isUndefined = function (obj: any): obj is undefined {
	return obj === void 0;
};
//Check Environment
export function isProduction() {
	return window.llc.env === "prod";
}
export function isDevelopment() {
	return window.llc.env === "dev";
}
export function isTest() {
	return window.llc.env === "test";
}
export function guid(): string {
	let d = new Date().getTime();
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}