export enum AuthErrorCodes {
    EmailAlreadyTaken = 'email_already_taken',
    ErrorMessage = "error_message",
    EmailNoMatch = "email_no_match",
    ResetTokenInvalid = "reset_token_invalid",
    ResetTokenExpired = "reset_token_expired",
    ResetTokenUsed = "reset_token_used",
    ResetUserNotFound = "reset_user_not_found",
    ResetEmailSendFailed = "reset_email_send_failed",
    ResetPasswordWeak = "reset_password_weak"
}
