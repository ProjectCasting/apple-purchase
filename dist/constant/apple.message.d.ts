export declare enum AppleMessage {
    SUCCESS = "This receipt is valid.",
    VALID_BUT_EMPTY = "The receipt is valid, but purchased nothing.",
    INVALID_JSON = "The App Store could not read the JSON object you provided.",
    INVALID_RECEIPT_DATA = "The data in the receipt-data property was malformed.",
    COULD_NOT_AUTHENTICATE = "The receipt could not be authenticated.",
    INVALID_SECRET = "The shared secret you provided does not match the shared secret on file for your account.",
    UNAVAILABLE = "The receipt server is not currently available.",
    EXPIRED_SUBSCRIPTION = "This receipt is valid but the subscription has expired.",
    TEST_RECEIPT = "This receipt is a sandbox receipt, but it was sent to the production service for verification.",
    PROD_RECEIPT = "This receipt is a production receipt, but it was sent to the sandbox service for verification.",
    COULD_NOT_AUTHORIZE = "This receipt could not be authorized. Treat this the same as if a purchase was never made."
}
