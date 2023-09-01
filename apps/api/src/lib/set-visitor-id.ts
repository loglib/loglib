export const setVisitorId = (userId?: string, ipAddress?: string) => {
	if (userId) {
		console.log(userId, "userID");
		return userId;
	}
	console.log(ipAddress, "ipAddress");
	return ipAddress || "unknown";
};
