export enum AppleCode {
  /** The receipt validated successfully. */
  SUCCESS = 0,

  /** The receipt is valid, but purchased nothing. */
  VALID_BUT_EMPTY = 2,

  /** The App Store could not read the JSON object you provided. */
  INVALID_JSON = 21000,

  /** The data in the receipt-data property was malformed or missing. */
  INVALID_RECEIPT_DATA = 21002,

  /** The receipt could not be authenticated. */
  COULD_NOT_AUTHENTICATE = 21003,

  /** The shared secret you provided does not match the shared secret on file for your account. */
  INVALID_SECRET = 21004,

  /** The receipt server is not currently available. */
  UNAVAILABLE = 21005,

  /** This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response.
   Only returned for iOS 6 style transaction receipts for auto-renewable subscriptions. */
  EXPIRED_SUBSCRIPTION = 21006,

  /** This receipt is from the test environment, but it was sent to the production environment for verification. Send it to the test environment instead. */
  TEST_RECEIPT = 21007,

  /** This receipt is from the production environment, but it was sent to the test environment for verification. Send it to the production environment instead. */
  PROD_RECEIPT = 21008,

  /** This receipt could not be authorized. Treat this the same as if a purchase was never made. */
  COULD_NOT_AUTHORIZE = 21010,
}
