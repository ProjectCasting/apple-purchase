export interface VerifyPostData {
    'receipt-data': string;
    password: string;
}
export interface RenewalInfo {
    expiration_intent: string;
    auto_renew_product_id: string;
    is_in_billing_retry_period: string;
    product_id: string;
    original_transaction_id: string;
    auto_renew_status: string;
}
export interface ReceiptInfo {
    quantity: string;
    product_id: string;
    transaction_id: string;
    original_transaction_id: string;
    purchase_date: string;
    purchase_date_ms: string;
    purchase_date_pst: string;
    original_purchase_date: string;
    original_purchase_date_ms: string;
    original_purchase_date_pst: string;
    is_trial_period: string;
    in_app_ownership_type: string;
    expires_date?: string;
    expires_date_ms?: string;
    expires_date_pst?: string;
    web_order_line_item_id?: string;
    is_in_intro_offer_period?: string;
    subscription_group_identifier?: string;
}
export interface InApp {
    quantity: string;
    product_id: string;
    transaction_id: string;
    original_transaction_id: string;
    purchase_date: string;
    purchase_date_ms: string;
    purchase_date_pst: string;
    original_purchase_date: string;
    original_purchase_date_ms: string;
    original_purchase_date_pst: string;
    is_trial_period: string;
    in_app_ownership_type: string;
    expires_date?: string;
    expires_date_ms?: string;
    expires_date_pst?: string;
    cancellation_date?: string;
    cancellation_date_ms?: string;
    cancellation_date_pst?: string;
    cancellation_reason?: string;
}
export interface Receipt {
    receipt_type: string;
    adam_id: number;
    app_item_id: number;
    bundle_id: string;
    application_version: string;
    download_id: number;
    version_external_identifier: number;
    receipt_creation_date: string;
    receipt_creation_date_ms: string;
    receipt_creation_date_pst: string;
    request_date: string;
    request_date_ms: string;
    request_date_pst: string;
    original_purchase_date: string;
    original_purchase_date_ms: string;
    original_purchase_date_pst: string;
    original_application_version: string;
    in_app: InApp[];
}
export interface VerifyResponse {
    status: number;
    environment?: string;
    receipt?: Receipt;
    latest_receipt?: string;
    pending_renewal_info?: RenewalInfo[];
    latest_receipt_info?: ReceiptInfo[];
}
