import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  /** Page title displayed in the sidebar */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
}

/**
 * AuthLayout - Layout for authentication pages (Sign In, Sign Up, Forgot Password)
 * Split screen: Left side content, Right side form
 */
export function AuthLayout({
  children,
  title = "Welcome back",
  subtitle = "Sign in to your account to continue shopping",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo.svg"
            alt="Logo"
            width={150}
            height={30}
            className="invert"
          />
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg text-primary-foreground/80">{subtitle}</p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} eCommerce. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden justify-center mb-8">
            <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={150}
              height={30}
              className="dark:invert"
            />
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
