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

interface Location {
  city: string;
  area: string;
  state: string;
}

interface Details {
  carpetArea: number;
  furnished: string;
  bhk: number | null;
  description: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  transactionType: string;
  propertyType: string;
  coverImage?: string;
  images: string[];
  location: Location;
  details: Details;
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

  // --- Helpers ---
  const formatPrice = (val?: number) =>
    typeof val === "number" ? `₹${val.toLocaleString()}` : "Price not set";

  const truncate = (text = "", n = 120) =>
    text.length <= n ? text : text.slice(0, n).trimEnd() + "...";

  // Generate initials: take first two letters of first+last (or first two letters if single name)
  const getInitials = (fullName?: string) => {
    if (!fullName) return "B";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // --- Load brokerId from localStorage (client-only) ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem("brokerId") || localStorage.getItem("brokerInfo");
      // If brokerInfo was stored as object, parse it and extract _id
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?._id) setBrokerId(parsed._id);
          else if (typeof stored === "string" && /^[a-fA-F0-9]{24}$/.test(stored)) setBrokerId(stored);
          else if (typeof stored === "string") setBrokerId(stored);
        } catch {
          // stored might be plain id string
          setBrokerId(stored);
        }
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

  // --- Fetch data when brokerId or page changes ---
  useEffect(() => {
    if (!brokerId) return;

    const fetchBrokerData = async () => {
      try {
        setLoading(true);
        setError("");

        const [brokerRes, propertyRes] = await Promise.all([
          fetch(`/api/broker/info/${brokerId}`, { cache: "no-store" }),
          fetch(`/api/broker/properties/${brokerId}?page=${page}&limit=6`, { cache: "no-store" }),
        ]);

        const brokerData = await brokerRes.json();
        if (!brokerData.success) throw new Error(brokerData.message || "Failed to fetch broker");

        const propertyData = await propertyRes.json();
        if (!propertyData.success) throw new Error(propertyData.message || "Failed to fetch properties");

        // Normalize incoming objects to our types (best-effort)
        setBroker(brokerData.broker as Broker);
        setProperties(propertyData.properties as Property[]);
        setPagination(propertyData.pagination as Pagination);
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

  // --- Loading / Error states ---
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-600">{error}</div>
      </div>
    );

  // --- Render dashboard ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-600 text-white text-xl font-semibold shadow">
            {getInitials(broker?.name)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{broker?.name || "Broker Name"}</h1>
            <p className="text-sm text-gray-600 mt-1">{broker?.phone || "Phone not set"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/broker/add-property")}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
            aria-label="Add property"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Add Property</span>
          </button>
        </div>
      </div>

      {/* Section title */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Listed Properties</h2>
          <p className="text-sm text-gray-600">Manage and view all properties you&apos;ve added.</p>
        </div>
        <div className="text-sm text-gray-500">{pagination ? `${pagination.total} total` : ""}</div>
      </div>

      {/* Properties grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <article
            key={p._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg"
          >
            {/* Cover */}
            <div className="relative w-full h-56">
              <Image
                src={p.coverImage || p.images?.[0] || "/placeholder.jpg"}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-1 flex gap-2 items-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">{p.propertyType}</span>
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{p.transactionType}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-indigo-600 font-semibold">{formatPrice(p.price)}</div>
                  <div className="text-xs text-gray-500 mt-1">{p.status}</div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M12 11.5a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 11.5c0 6.5-7.5 10.5-7.5 10.5S4.5 18 4.5 11.5a7.5 7.5 0 1115 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{p.location.area}, {p.location.city}{p.location.state ? `, ${p.location.state}` : ""}</span>
                </div>
              </div>

              {/* Details row */}
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
                  {p.details.carpetArea ? `${p.details.carpetArea} sqft` : "Area N/A"}
                </div>
                <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {p.details.furnished || "Furnishing N/A"}
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{truncate(p.details.description ?? "", 140)}</p>

              {/* Footer meta */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{p.details.bhk ? `${p.details.bhk} BHK` : ""}</span>
                <span>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      {pagination && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={pagination.currentPage === 1}
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            className="px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Prev
          </button>

          <div className="text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>

          <button
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => setPage((s) => Math.min(pagination.totalPages, s + 1))}
            className="px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
