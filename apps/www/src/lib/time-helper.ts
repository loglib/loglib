export const getLast24Hour = () => {
	const today = new Date();
	today.setMilliseconds(new Date().getMilliseconds() - 1000 * 60 * 60 * 24);
	return today;
};

export const getToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

export const getYesterday = () => {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday.setHours(0, 0, 0, 0);
	return yesterday;
};

export const getTomorrow = () => {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
	return tomorrow;
};

export const getThisWeek = () => {
	const today = getToday();
	const dayOfWeek = today.getDay();
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - dayOfWeek);
	startOfWeek.setHours(0, 0, 0, 0);
	const endOfWeek = new Date(today);
	endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
	endOfWeek.setHours(23, 59, 59, 999);
	return { startDate: startOfWeek, endDate: endOfWeek };
};

export const getLastSevenDays = () => {
	const today = getToday();
	const startOfLastWeek = new Date(today);
	startOfLastWeek.setDate(today.getDate() - 6);
	startOfLastWeek.setHours(0, 0, 0, 0);
	const endOfToday = new Date(today);
	endOfToday.setHours(23, 59, 59, 999);
	return { startDate: startOfLastWeek, endDate: endOfToday };
};

export const getThisMonth = () => {
	const today = getToday();
	const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	endOfMonth.setHours(23, 59, 59, 999);
	return { startDate: startOfMonth, endDate: endOfMonth };
};

export const getLastThirtyDays = () => {
	const today = getToday();
	const startOfLastThirtyDays = new Date(today);
	startOfLastThirtyDays.setDate(today.getDate() - 29);
	startOfLastThirtyDays.setHours(0, 0, 0, 0);
	const endOfToday = new Date(today);
	endOfToday.setHours(23, 59, 59, 999);
	return { startDate: startOfLastThirtyDays, endDate: endOfToday };
};
export const getLastNinetyDays = () => {
	const today = getToday();
	const startOfLastNinetyDays = new Date(today);
	startOfLastNinetyDays.setDate(today.getDate() - 89);
	startOfLastNinetyDays.setHours(0, 0, 0, 0);
	const endOfToday = new Date(today);
	endOfToday.setHours(23, 59, 59, 999);
	return { startDate: startOfLastNinetyDays, endDate: endOfToday };
};

export const getThisYear = () => {
	const today = getToday();
	const startOfYear = new Date(today.getFullYear(), 0, 1);
	const endOfYear = new Date(today.getFullYear(), 11, 31);
	endOfYear.setHours(23, 59, 59, 999);
	return { startDate: startOfYear, endDate: endOfYear };
};

export const getTimeRange = (startDate: Date, endDate: Date) => {
	const diff = endDate.getTime() - startDate.getTime();
	return diff;
};
