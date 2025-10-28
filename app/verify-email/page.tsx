"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        setStatus("verifying");
        const res = await fetch("/api/users/verifyEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(data?.message || "Verification failed");
          return;
        }
        setStatus("success");
        setMessage("Email verified successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } catch (e) {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Verify Email</h1>
        {status === "verifying" && (
          <p className="text-zinc-600 dark:text-zinc-400">Verifying...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 dark:text-green-400">{message}</p>
        )}
        {status === "error" && (
          <p className="text-red-600 dark:text-red-400">{message}</p>
        )}
      </div>
    </div>
  );
}
