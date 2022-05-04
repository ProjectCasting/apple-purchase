"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.Subtype = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["CONSUMPTION_REQUEST"] = "CONSUMPTION_REQUEST";
    NotificationType["DID_CHANGE_RENEWAL_PREF"] = "DID_CHANGE_RENEWAL_PREF";
    NotificationType["DID_CHANGE_RENEWAL_STATUS"] = "DID_CHANGE_RENEWAL_STATUS";
    NotificationType["DID_FAIL_TO_RENEW"] = "DID_FAIL_TO_RENEW";
    NotificationType["DID_RENEW"] = "DID_RENEW";
    NotificationType["EXPIRED"] = "EXPIRED";
    NotificationType["GRACE_PERIOD_EXPIRED"] = "GRACE_PERIOD_EXPIRED";
    NotificationType["OFFER_REDEEMED"] = "OFFER_REDEEMED";
    NotificationType["PRICE_INCREASE"] = "PRICE_INCREASE";
    NotificationType["REFUND"] = "REFUND";
    NotificationType["REFUND_DECLINED"] = "REFUND_DECLINED";
    NotificationType["RENEWAL_EXTENDED"] = "RENEWAL_EXTENDED";
    NotificationType["REVOKE"] = "REVOKE";
    NotificationType["SUBSCRIBED"] = "SUBSCRIBED";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var Subtype;
(function (Subtype) {
    Subtype["INITIAL_BUY"] = "INITIAL_BUY";
    Subtype["RESUBSCRIBE"] = "RESUBSCRIBE";
    Subtype["DOWNGRADE"] = "DOWNGRADE";
    Subtype["UPGRADE"] = "UPGRADE";
    Subtype["AUTO_RENEW_ENABLED"] = "AUTO_RENEW_ENABLED";
    Subtype["AUTO_RENEW_DISABLED"] = "AUTO_RENEW_DISABLED";
    Subtype["VOLUNTARY"] = "VOLUNTARY";
    Subtype["BILLING_RETRY"] = "BILLING_RETRY";
    Subtype["PRICE_INCREASE"] = "PRICE_INCREASE";
    Subtype["GRACE_PERIOD"] = "GRACE_PERIOD";
    Subtype["BILLING_RECOVERY"] = "BILLING_RECOVERY";
    Subtype["PENDING"] = "PENDING";
    Subtype["ACCEPTED"] = "ACCEPTED";
})(Subtype = exports.Subtype || (exports.Subtype = {}));
var Action;
(function (Action) {
    Action["CREATE"] = "CREATE";
    Action["UPDATE"] = "UPDATE";
    Action["CHANGE_RENEW"] = "CHANGE_RENEW";
    Action["REFUND"] = "REFUND";
    Action["IGNORE"] = "IGNORE";
})(Action = exports.Action || (exports.Action = {}));
//# sourceMappingURL=apple.webhook.js.map