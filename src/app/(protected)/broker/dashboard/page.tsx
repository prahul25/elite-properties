"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  // ✅ Safely read broker ID from localStorage after hydration
  useEffect(() => {
    try {
      const storedBrokerId = localStorage.getItem("brokerId");
 
      if (storedBrokerId) {
        if (storedBrokerId) setBrokerId(storedBrokerId);
        else throw new Error("Invalid broker data in localStorage");
      } else {
        setError("Broker not logged in or localStorage empty");
        setLoading(false);
      }
    } catch (err) {
      console.error("localStorage error:", err);
      setError("Failed to read broker ID");
      setLoading(false);
    }
  }, []); // ✅ runs once only (no dependency)

  // ✅ Fetch broker info + properties when brokerId is ready
  useEffect(() => {
    if (!brokerId) return; // wait until brokerId is set

    const fetchBrokerData = async () => {
      try {
        setLoading(true);
        setError("");

        // 🟦 Fetch broker info
        const brokerRes = await fetch(`/api/broker/info/${brokerId}`, {
          cache: "no-store",
        });
        const brokerData = await brokerRes.json();
        if (!brokerData.success) throw new Error(brokerData.message);

        // 🟩 Fetch broker's listed properties
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
}
 finally {
        setLoading(false);
      }
    };

    fetchBrokerData();
  }, [brokerId, page]); // ✅ brokerId is a proper dependency now

  // 🟨 Loading State
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading dashboard...
      </div>
    );

  // 🟥 Error State
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  // 🟩 Render UI
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
      {/* Broker Info Section */}
      {broker && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-2">{broker.name}</h2>
          <p className="text-gray-300">📞 {broker.phone}</p>
          {broker.email && <p className="text-gray-300">📧 {broker.email}</p>}
        </div>
      )}

      {/* Property List Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Listed Properties</h3>

        {properties.length === 0 ? (
          <p className="text-gray-400">No properties listed yet.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div
                  key={p._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={p.images?.[0] || "/placeholder.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {p.propertyType} • {p.transactionType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {p.city}, {p.area}
                    </p>
                    <p className="text-blue-400 font-bold mt-2">
                      ₹{p.price.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        p.status === "Available"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {p.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-gray-300">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
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
