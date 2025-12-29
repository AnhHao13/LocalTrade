/**
 * User Domain Types
 *
 * Domain models for user-related entities.
 */

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

/**
 * User address
 */
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

/**
 * Authentication result
 */
export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Registration data
 */
export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
}

/**
 * Password reset request
 */
export interface PasswordResetInput {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Profile update data
 */
export interface UpdateProfileInput {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}
