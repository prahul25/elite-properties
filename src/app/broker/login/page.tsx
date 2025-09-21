"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BrokerLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
console.log(process.env.NEXT_PUBLIC_API_URL,"CHECKING")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save tokens
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      localStorage.setItem("brokerInfo", JSON.stringify(data.broker));
      router.push(`/broker/add-property?brokerId=${data.broker._id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Broker Login</h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email (leave empty if using phone)"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (leave empty if using email)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
