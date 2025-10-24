"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Phone, User } from "lucide-react";
import Link from "next/link";

export default function BrokerSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/broker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
// console.log(data,"data shiowing")
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("brokerId", data.broker._id);

      window.location.href = `/broker/dashboard`;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#FFF4ED] to-white">
      {/* Left Illustration */}

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Create Account 🚀
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            Join us to start listing and managing your properties
          </p>

          {error && (
            <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Password */}
           {/* Password */}
<div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
  />

  {/* Eye Icon — appears only when user types something */}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  )}
</div>


            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:scale-[1.02] transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/broker/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Image
          src="/illustrations/signup-graphic.png" // place your final illustration here
          alt="Signup Illustration"
          width={550}
          height={550}
          priority
        />
      </div>

      
      
    </div>
  );
}