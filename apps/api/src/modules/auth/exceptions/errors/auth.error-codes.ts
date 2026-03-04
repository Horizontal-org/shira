export enum AuthErrorCodes {
    EmailAlreadyTaken = 'email_already_taken',
    ErrorMessage = "error_message",
    EmailNoMatch = "email_no_match",
    UserNotFound = "user_not_found",
    InvalidEmailUpdate = "invalid_email_update",
    EmailUpdateTokenInvalid = "email_update_token_invalid",
    ResetTokenInvalid = "reset_token_invalid",
    ResetTokenExpired = "reset_token_expired",
    ResetTokenUsed = "reset_token_used",
    ResetEmailSendFailed = "reset_email_send_failed",
    ResetPasswordWeak = "reset_password_weak",
    ResetPasswordConfirmationMismatch = "reset_password_confirmation_mismatch"
}
