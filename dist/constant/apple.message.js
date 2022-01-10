"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleMessage = void 0;
var AppleMessage;
(function (AppleMessage) {
    AppleMessage["SUCCESS"] = "This receipt is valid.";
    AppleMessage["VALID_BUT_EMPTY"] = "The receipt is valid, but purchased nothing.";
    AppleMessage["INVALID_JSON"] = "The App Store could not read the JSON object you provided.";
    AppleMessage["INVALID_RECEIPT_DATA"] = "The data in the receipt-data property was malformed.";
    AppleMessage["COULD_NOT_AUTHENTICATE"] = "The receipt could not be authenticated.";
    AppleMessage["INVALID_SECRET"] = "The shared secret you provided does not match the shared secret on file for your account.";
    AppleMessage["UNAVAILABLE"] = "The receipt server is not currently available.";
    AppleMessage["EXPIRED_SUBSCRIPTION"] = "This receipt is valid but the subscription has expired.";
    AppleMessage["TEST_RECEIPT"] = "This receipt is a sandbox receipt, but it was sent to the production service for verification.";
    AppleMessage["PROD_RECEIPT"] = "This receipt is a production receipt, but it was sent to the sandbox service for verification.";
    AppleMessage["COULD_NOT_AUTHORIZE"] = "This receipt could not be authorized. Treat this the same as if a purchase was never made.";
})(AppleMessage = exports.AppleMessage || (exports.AppleMessage = {}));
//# sourceMappingURL=apple.message.js.map