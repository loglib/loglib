export const apiResponse = {
    badRequest: {
        data: {
            message: "Invalid request body",
        },
        status: 400,
    },
    serverError: {
        data: {
            message: "Server error",
        },
        status: 500,
    },
    unAuthorized: {
        data: {
            message: "Seems like you're not authorized!",
        },
        status: 401,
    },
};
