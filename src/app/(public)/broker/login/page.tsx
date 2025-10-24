"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function BrokerLoginPage() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("brokerId", data.broker._id);

      window.location.href = `/broker/dashboard`;
    } catch (err) {
      console.error("Login error:", err);
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#FFF4ED] to-white">
      {/* Left Illustration Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <Image
          src="/illustrations/broker-login.png"
          alt="Broker Login Illustration"
          width={700}
          height={700}
          priority
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to manage and list your properties
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Input */}
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition pr-12"
              />

              {/* Eye Icon — visible only when user types something */}
              {formData.password && (
                <button
                  type="button"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                  onTouchStart={() => setShowPassword(true)}
                  onTouchEnd={() => setShowPassword(false)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label="Show password"
                >
                  <FaEye size={18} />
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            New here?{" "}
            <Link
              href="/broker/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register as Broker
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
