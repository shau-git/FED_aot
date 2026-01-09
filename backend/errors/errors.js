const BadRequestError = require("./bad-request")
const UnauthenticatedError = require("./unauthenticated")
const ForbiddenError = require("./forbidden")
const CustomAPIError = require("./custom-error")

module.exports = {
    BadRequestError, 
    UnauthenticatedError,
    ForbiddenError,
    CustomAPIError
}