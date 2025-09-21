"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Property {
  _id: string;
  title: string;
  transactionType: string;
  propertyType: string;
  price: number;
  location: {
    city: string;
    area: string;
    state: string;
  };
  images: string[];
  status: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch");

        setProperties(data);
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

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Properties</h1>

      {properties.length === 0 ? (
        <p className="text-center">No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <Image
  src={property.images[0] || "/placeholder.jpg"}
  alt={property.title}
  width={400}
  height={300}
  className="w-full h-48 object-cover"
/>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">
                  {property.location.area}, {property.location.city}, {property.location.state}
                </p>
                <p className="text-blue-600 font-bold mt-2">₹{property.price}</p>
                <p className="text-sm text-gray-500">
                  {property.transactionType} • {property.propertyType}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
