/**
 * Auth Service
 *
 * Handles all authentication-related API calls.
 * Uses the base api-client - NO direct fetch calls.
 */

import {
  createApiClient,
  type ApiClient,
  setAccessToken,
  clearAccessToken,
} from "./api-client";
import type {
  UserDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RefreshTokenRequestDTO,
  ResetPasswordRequestDTO,
  ForgotPasswordRequestDTO,
  UpdateProfileRequestDTO,
} from "@/types/api";
import type {
  User,
  AuthResult,
  LoginCredentials,
  RegisterInput,
  PasswordResetInput,
  UpdateProfileInput,
} from "@/types";

// =============================================================================
// Mappers: DTO → Domain
// =============================================================================

function mapUserDTO(dto: UserDTO): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    firstName: dto.first_name,
    lastName: dto.last_name,
    avatar: dto.avatar,
    phone: dto.phone,
    isEmailVerified: dto.is_email_verified,
    createdAt: new Date(dto.created_at),
  };
}

function mapLoginResponse(dto: LoginResponseDTO): AuthResult {
  return {
    user: mapUserDTO(dto.user),
    accessToken: dto.access_token,
    refreshToken: dto.refresh_token,
    expiresAt: new Date(dto.expires_at),
  };
}

// =============================================================================
// Mappers: Domain → DTO
// =============================================================================

function mapLoginCredentials(credentials: LoginCredentials): LoginRequestDTO {
  return {
    email: credentials.email,
    password: credentials.password,
    remember_me: credentials.rememberMe,
  };
}

function mapRegisterInput(input: RegisterInput): RegisterRequestDTO {
  return {
    email: input.email,
    password: input.password,
    name: input.name,
    accept_terms: input.acceptTerms,
  };
}

function mapPasswordResetInput(
  input: PasswordResetInput
): ResetPasswordRequestDTO {
  return {
    token: input.token,
    password: input.password,
    password_confirmation: input.confirmPassword,
  };
}

function mapUpdateProfileInput(
  input: UpdateProfileInput
): UpdateProfileRequestDTO {
  return {
    name: input.name,
    first_name: input.firstName,
    last_name: input.lastName,
    phone: input.phone,
    avatar: input.avatar,
  };
}

// =============================================================================
// Service Factory
// =============================================================================

/**
 * Creates an auth service instance for a specific locale.
 *
 * @param locale - The locale for API requests
 * @returns Auth service with typed methods
 *
 * @example
 * ```ts
 * const authService = createAuthService('en');
 *
 * // Login
 * const result = await authService.login({ email, password });
 *
 * // Register
 * const result = await authService.register({ email, password, name, acceptTerms: true });
 *
 * // Get current user
 * const user = await authService.getCurrentUser();
 * ```
 */
export function createAuthService(locale: string) {
  const api: ApiClient = createApiClient(locale);

  return {
    /**
     * Login with email and password
     *
     * @endpoint POST /api/{locale}/auth/login
     */
    async login(credentials: LoginCredentials): Promise<AuthResult> {
      const response = await api.post<LoginResponseDTO>("/auth/login", {
        body: mapLoginCredentials(credentials),
        skipAuth: true,
      });

      // Store the token
      setAccessToken(response.access_token);

      return mapLoginResponse(response);
    },

    /**
     * Register a new user
     *
     * @endpoint POST /api/{locale}/auth/register
     */
    async register(input: RegisterInput): Promise<AuthResult> {
      const response = await api.post<LoginResponseDTO>("/auth/register", {
        body: mapRegisterInput(input),
        skipAuth: true,
      });

      // Store the token
      setAccessToken(response.access_token);

      return mapLoginResponse(response);
    },

    /**
     * Logout the current user
     *
     * @endpoint POST /api/{locale}/auth/logout
     */
    async logout(): Promise<void> {
      try {
        await api.post<void>("/auth/logout");
      } finally {
        // Always clear the token, even if the API call fails
        clearAccessToken();
      }
    },

    /**
     * Refresh the access token
     *
     * @endpoint POST /api/{locale}/auth/refresh
     */
    async refreshToken(refreshToken: string): Promise<AuthResult> {
      const body: RefreshTokenRequestDTO = { refresh_token: refreshToken };
      const response = await api.post<LoginResponseDTO>("/auth/refresh", {
        body,
        skipAuth: true,
      });

      // Store the new token
      setAccessToken(response.access_token);

      return mapLoginResponse(response);
    },

    /**
     * Get the current authenticated user
     *
     * @endpoint GET /api/{locale}/auth/me
     */
    async getCurrentUser(): Promise<User> {
      const response = await api.get<{ data: UserDTO }>("/auth/me");
      return mapUserDTO(response.data);
    },

    /**
     * Request password reset email
     *
     * @endpoint POST /api/{locale}/auth/forgot-password
     */
    async forgotPassword(email: string): Promise<void> {
      const body: ForgotPasswordRequestDTO = { email };
      await api.post<void>("/auth/forgot-password", {
        body,
        skipAuth: true,
      });
    },

    /**
     * Reset password with token
     *
     * @endpoint POST /api/{locale}/auth/reset-password
     */
    async resetPassword(input: PasswordResetInput): Promise<void> {
      await api.post<void>("/auth/reset-password", {
        body: mapPasswordResetInput(input),
        skipAuth: true,
      });
    },

    /**
     * Update user profile
     *
     * @endpoint PATCH /api/{locale}/auth/profile
     */
    async updateProfile(input: UpdateProfileInput): Promise<User> {
      const response = await api.patch<{ data: UserDTO }>("/auth/profile", {
        body: mapUpdateProfileInput(input),
      });
      return mapUserDTO(response.data);
    },

    /**
     * Verify email with token
     *
     * @endpoint POST /api/{locale}/auth/verify-email
     */
    async verifyEmail(token: string): Promise<void> {
      await api.post<void>("/auth/verify-email", {
        body: { token },
        skipAuth: true,
      });
    },

    /**
     * Resend verification email
     *
     * @endpoint POST /api/{locale}/auth/resend-verification
     */
    async resendVerificationEmail(): Promise<void> {
      await api.post<void>("/auth/resend-verification");
    },
  };
}

// =============================================================================
// Type Export
// =============================================================================

export type AuthService = ReturnType<typeof createAuthService>;
