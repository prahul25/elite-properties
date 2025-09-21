"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AddPropertyForm() {
    const searchParams = useSearchParams();
    const brokerId = searchParams.get("brokerId");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    transactionType: "Rent",
    propertyType: "",
    price: "",
    city: "",
    area: "",
    state: "",
    carpetArea: "",
    furnished: "Unfurnished",
    bhk: "",
    description: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    if (!brokerId) throw new Error("Broker ID missing in URL");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("transactionType", formData.transactionType);
    form.append("propertyType", formData.propertyType);
    form.append("price", formData.price);

    // ✅ Fix: send nested objects
    form.append(
      "location",
      JSON.stringify({
        city: formData.city,
        area: formData.area,
        state: formData.state,
      })
    );

    form.append(
      "details",
      JSON.stringify({
        carpetArea: formData.carpetArea,
        furnished: formData.furnished,
        bhk: formData.bhk,
        description: formData.description,
      })
    );

    formData.images.forEach((file) => form.append("images", file));

    // ✅ brokerId from query param
    form.append("brokerId", brokerId);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/add`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add property");

    router.push("/properties");
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Add New Property
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded">
            {error}
          </p>
        )}

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
          required
        />

        {/* Transaction Type */}
        <select
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        >
          <option value="Rent">Rent</option>
          <option value="Sell">Sell</option>
          <option value="Lease">Lease</option>
        </select>

        {/* Property Type */}
        <input
          type="text"
          name="propertyType"
          placeholder="Property Type (e.g. House, Office)"
          value={formData.propertyType}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
          required
        />

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border rounded px-4 py-2"
          />
        </div>

        {/* Details */}
        <input
          type="number"
          name="carpetArea"
          placeholder="Carpet Area (sq ft)"
          value={formData.carpetArea}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
          required
        />

        <select
          name="furnished"
          value={formData.furnished}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        >
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>

        <input
          type="number"
          name="bhk"
          placeholder="BHK (optional)"
          value={formData.bhk}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        {/* Images */}
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Adding Property..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPropertyForm />
    </Suspense>
  );
}
