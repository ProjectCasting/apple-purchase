export enum NotificationType {
  CONSUMPTION_REQUEST = 'CONSUMPTION_REQUEST',
  DID_CHANGE_RENEWAL_PREF = 'DID_CHANGE_RENEWAL_PREF',
  DID_CHANGE_RENEWAL_STATUS = 'DID_CHANGE_RENEWAL_STATUS',
  DID_FAIL_TO_RENEW = 'DID_FAIL_TO_RENEW',
  DID_RENEW = 'DID_RENEW',
  EXPIRED = 'EXPIRED',
  GRACE_PERIOD_EXPIRED = 'GRACE_PERIOD_EXPIRED',
  OFFER_REDEEMED = 'OFFER_REDEEMED',
  PRICE_INCREASE = 'PRICE_INCREASE',
  REFUND = 'REFUND',
  REFUND_DECLINED = 'REFUND_DECLINED',
  RENEWAL_EXTENDED = 'RENEWAL_EXTENDED',
  REVOKE = 'REVOKE',
  SUBSCRIBED = 'SUBSCRIBED'
}

export enum Subtype {
  INITIAL_BUY = 'INITIAL_BUY',
  RESUBSCRIBE = 'RESUBSCRIBE',
  DOWNGRADE = 'DOWNGRADE',
  UPGRADE = 'UPGRADE',
  AUTO_RENEW_ENABLED = 'AUTO_RENEW_ENABLED',
  AUTO_RENEW_DISABLED = 'AUTO_RENEW_DISABLED',
  VOLUNTARY = 'VOLUNTARY',
  BILLING_RETRY = 'BILLING_RETRY',
  PRICE_INCREASE = 'PRICE_INCREASE',
  GRACE_PERIOD = 'GRACE_PERIOD',
  BILLING_RECOVERY = 'BILLING_RECOVERY',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}

export enum Action {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  IGNORE = 'IGNORE'
}
