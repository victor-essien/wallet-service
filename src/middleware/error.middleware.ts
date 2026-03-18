/**
 * Base Application Error Class
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string | undefined;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * 400 - Bad Request
 * Used for validation errors and malformed requests
 */
export class ValidationError extends AppError {
  constructor(message: string = "Validation failed") {
    super(message, 400, true, "VALIDATION_ERROR");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 401 - Unauthorized
 * Used when authentication is required but not provided
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401, true, "AUTHENTICATION_ERROR");
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * 403 - Forbidden
 * Used when user doesn't have permission to access resource
 */
export class AuthorizationError extends AppError {
  constructor(message: string = "Access denied") {
    super(message, 403, true, "AUTHORIZATION_ERROR");
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * 404 - Not Found
 * Used when requested resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, true, "NOT_FOUND");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * 429 - Too Many Requests
 * Used when rate limit is exceeded
 */
export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429, true, "RATE_LIMIT_ERROR");
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * 500 - Internal Server Error
 * Used for unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500, false, "INTERNAL_SERVER_ERROR");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * 400 - Bad Request
 * Used when there's insufficient funds
 */

export class InsufficientFundsError extends AppError {
  constructor(message: string = "Insufficient funds") {
    super(message, 400, true, "INSUFFICIENT_FUNDS");
    Object.setPrototypeOf(this, InsufficientFundsError.prototype);
  }
}
/**
 * 400 - Bad Request
 * Used when amount is less than 0
 */
export class AmountLessError extends AppError {
  constructor(message: string = "Amount must be greater than zero") {
    super(message, 400, true, "AMOUNT_LESS_THAN_ZERO");
    Object.setPrototypeOf(this, AmountLessError.prototype);
  }
}

/**
 * 400 - Bad Request
 * Used when amount is invalid
 */
export class InvalidAmountError extends AppError {
  constructor(message: string = "Invalid amount") {
    super(message, 400, true, "INVALID_AMOUNT");
    Object.setPrototypeOf(this, InvalidAmountError.prototype);
  }
}

/**
 * 404 - Not found
 * Used when wallet is not found
 */
export class WalletNotFoundError extends AppError {
  constructor() {
    super("Wallet not found", 404, true, "WALLET_NOT_FOUND");
    Object.setPrototypeOf(this, WalletNotFoundError.prototype);
  }
}

/**
 * 404 - Not found
 * User not found
 */
export class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 404, true, "USER_NOT_FOUND");
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

/**
 * 409 - Already exists
 * User already exists
 */
export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User already exists", 409, true, "USER_ALREADY_EXISTS");
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}
/**
 * 403 - Forbidden
 * Used when user is blacklisted
 */
export class BlacklistedUserError extends AppError {
  constructor() {
    super(
      "User is blacklisted and cannot be onboarded",
      403,
      true,
      "BLACKLISTED_USER",
    );
    Object.setPrototypeOf(this, BlacklistedUserError.prototype);
  }
}
