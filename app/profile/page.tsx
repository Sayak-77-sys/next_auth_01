"use client";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout response:", response.data);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Logout Failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User details:", response.data);
      setUserData({
        username: response.data.user.username,
        email: response.data.user.email,
      });
      toast.success("User details loaded");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to fetch user details"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-sans dark:bg-zinc-900">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 shadow-lg rounded-2xl p-6 border dark:border-zinc-700 text-center">
        <h1 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-white">
          Your Profile
        </h1>
        <hr className="mb-4 border-zinc-300 dark:border-zinc-700" />

        <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-4">
          Welcome to your profile page!
        </p>

        {userData && (
          <div className="mb-4 p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
            <p className="text-zinc-800 dark:text-white font-semibold mb-2">
              Username:
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {userData.username}
            </p>
            <p className="text-zinc-800 dark:text-white font-semibold mb-2 mt-3">
              Email:
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">{userData.email}</p>
          </div>
        )}

        <hr className="my-4" />
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="mt-4 w-full bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
