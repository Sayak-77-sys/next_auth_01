"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/api/users/login", user);
      console.log("Login response:", response.data);

      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-sans dark:bg-zinc-900">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 shadow-lg rounded-2xl p-6 border dark:border-zinc-700">
        <h1 className="text-2xl font-semibold text-center mb-4 text-zinc-800 dark:text-white">
          Login
        </h1>
        <hr className="mb-4 border-zinc-300 dark:border-zinc-700" />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-2 mt-1 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-2 mt-1 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          onClick={onLogin}
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4 text-zinc-600 dark:text-zinc-400">
          Don’t have an account?
          <a href="/signup" className="text-blue-600 hover:underline ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
