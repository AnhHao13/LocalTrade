/**
 * Auth API DTOs
 *
 * Data Transfer Objects for authentication endpoints.
 */

/**
 * User response from auth endpoints
 */
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;
  is_email_verified: boolean;
  created_at: string;
}

/**
 * Login request body for POST /api/{locale}/auth/login
 */
export interface LoginRequestDTO {
  email: string;
  password: string;
  remember_me?: boolean;
}

/**
 * Login response from POST /api/{locale}/auth/login
 */
export interface LoginResponseDTO {
  user: UserDTO;
  access_token: string;
  refresh_token?: string;
  expires_at: string;
}

/**
 * Register request body for POST /api/{locale}/auth/register
 */
export interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
  accept_terms: boolean;
}

/**
 * Refresh token request for POST /api/{locale}/auth/refresh
 */
export interface RefreshTokenRequestDTO {
  refresh_token: string;
}

/**
 * Password reset request for POST /api/{locale}/auth/reset-password
 */
export interface ResetPasswordRequestDTO {
  token: string;
  password: string;
  password_confirmation: string;
}

/**
 * Forgot password request for POST /api/{locale}/auth/forgot-password
 */
export interface ForgotPasswordRequestDTO {
  email: string;
}

/**
 * Profile update request for PATCH /api/{locale}/auth/profile
 */
export interface UpdateProfileRequestDTO {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
}
