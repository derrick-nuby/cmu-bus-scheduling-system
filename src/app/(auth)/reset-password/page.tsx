"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<{ email: string; code: string; } | null>(null);

  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    if (!email || !code) {
      redirect("/forgot-password");
    }

    setParams({ email, code });
  }, [searchParams]);

  if (!params) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <ResetPasswordForm email={params.email} code={params.code} />;
}

