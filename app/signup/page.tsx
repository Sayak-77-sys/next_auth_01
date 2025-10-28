"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-sans dark:bg-zinc-900">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 shadow-lg rounded-2xl p-6 border dark:border-zinc-700">
        <h1 className="text-2xl font-semibold text-center mb-4 text-zinc-800 dark:text-white">
          {loading ? "Processing..." : "Create an Account"}
        </h1>
        <hr className="mb-4 border-zinc-300 dark:border-zinc-700" />

        <label
          htmlFor="username"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="w-full p-2 mt-1 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full p-2 mt-1 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full p-2 mt-1 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={onSignup}
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-2"
        >
          {buttonDisabled ? "Please fill all fields" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4 text-zinc-600 dark:text-zinc-400">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
