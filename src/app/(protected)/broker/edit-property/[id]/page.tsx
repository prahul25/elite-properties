"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    transactionType: "Rent",
    propertyType: "",
    price: "",
    location: { city: "", area: "", state: "" },
    details: { carpetArea: "", furnished: "Furnished", bhk: "", description: "" },
    status: "Active",
    images: [] as File[],
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/details/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch property");

        setFormData({
          ...data.property,
          location: data.property.location || { city: "", area: "", state: "" },
          details: data.property.details || {
            carpetArea: "",
            furnished: "Furnished",
            bhk: "",
            description: "",
          },
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // ✅ Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name.startsWith("details.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        details: { ...prev.details, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const form = new FormData();
      form.append("id", id as string);
      form.append("title", formData.title);
      form.append("transactionType", formData.transactionType);
      form.append("propertyType", formData.propertyType);
      form.append("price", formData.price);
      form.append("location", JSON.stringify(formData.location));
      form.append("details", JSON.stringify(formData.details));
      form.append("status", formData.status);

      for (const img of formData.images) {
        form.append("images", img);
      }

      const res = await fetch(`/api/properties/update`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update property");

      toast.success("Property updated successfully");
      router.push("/broker/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update property");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading property details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Edit Property</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
              <option value="Lease">Lease</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Property Type</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="location.city"
            placeholder="City"
            value={formData.location.city}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="location.area"
            placeholder="Area"
            value={formData.location.area}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="location.state"
            placeholder="State"
            value={formData.location.state}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="details.carpetArea"
            placeholder="Carpet Area"
            value={formData.details.carpetArea}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          <select
            name="details.furnished"
            value={formData.details.furnished}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <textarea
          name="details.description"
          placeholder="Description"
          value={formData.details.description}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />

        {/* Status */}
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-1">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={(e) => setFormData((prev) => ({ ...prev, images: Array.from(e.target.files || []) }))}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
