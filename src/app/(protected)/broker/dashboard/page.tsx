"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Broker {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  transactionType: string;
  propertyType: string;
  city: string;
  area: string;
  images: string[];
  status: string;
  createdAt?: string;
}

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export default function BrokerDashboardPage() {
  const [brokerId, setBrokerId] = useState<string | null>(null);
  const [broker, setBroker] = useState<Broker | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const storedBrokerId = localStorage.getItem("brokerId");
      if (storedBrokerId) {
        setBrokerId(storedBrokerId);
      } else {
        setError("Broker not logged in or localStorage empty");
        setLoading(false);
      }
    } catch (err) {
      console.error("localStorage error:", err);
      setError("Failed to read broker ID");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!brokerId) return;

    const fetchBrokerData = async () => {
      try {
        setLoading(true);
        setError("");

        const brokerRes = await fetch(`/api/broker/info/${brokerId}`, { cache: "no-store" });
        const brokerData = await brokerRes.json();
        if (!brokerData.success) throw new Error(brokerData.message);

        const propertyRes = await fetch(
          `/api/broker/properties/${brokerId}?page=${page}&limit=6`,
          { cache: "no-store" }
        );
        const propertyData = await propertyRes.json();
        if (!propertyData.success) throw new Error(propertyData.message);

        setBroker(brokerData.broker);
        setProperties(propertyData.properties);
        setPagination(propertyData.pagination);
      } catch (err: unknown) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to load data";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokerData();
  }, [brokerId, page]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );

  // 🧩 Generate initials for avatar
  const initials =
    broker?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "B";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8">
      {/* 🔹 Top Broker Info Bar */}
      {broker && (
        <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-md mb-10 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold shadow-sm">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{broker.name}</h2>
              <p className="text-sm text-gray-500">{broker.phone}</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/broker/add-property")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Property
          </button>
        </div>
      )}

      {/* 🔸 Properties Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Your Listed Properties</h3>

        {properties.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No properties listed yet.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 overflow-hidden"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={p.images?.[0] || "/placeholder.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                    <p className="text-sm text-gray-500">
                      {p.propertyType} • {p.transactionType}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {p.area}, {p.city}
                    </p>
                    <p className="text-blue-600 font-semibold mt-3">
                      ₹{p.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {p.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔻 Pagination */}
            {pagination && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  Prev
                </button>
                <span className="text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
