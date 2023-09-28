export const setVisitorId = (userId?: string, ipAddress?: string) => {
    if (userId) {
        return userId;
    }
    return ipAddress || "unknown";
};
