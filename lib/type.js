const type = {
    SUCCESS: {
        status: 200,
        message: "",
        success: true,
    },
    NOT_FOUND: {
        status: 404,
        message: "Not Found",
        success: false,
    },
    UNAUTHORIZED : {
        status: 401,
        message: "Unauthorized",
        success: false,
    },
    BAD_REQUEST : {
        status: 400,
        message: "Bad Request",
        success: false,
    }
}

module.exports = type;