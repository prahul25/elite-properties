"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

function AddPropertyForm() {
  const searchParams = useSearchParams();
  const brokerId = searchParams.get("brokerId");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState<"commercial" | "residential">("commercial");

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
    coverImage: null as File | null,
    galleryImages: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  // const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files).slice(0, 5); // limit 5
  //     setFormData({ ...formData, galleryImages: files });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!brokerId) throw new Error("Broker ID missing in URL");

      const form = new FormData();
      form.append("title", formData.title);
      form.append("transactionType", formData.transactionType);
      form.append("price", formData.price);

      // Residential only
      if (activeType === "residential") {
        form.append("propertyType", formData.propertyType);
        form.append("bhk", formData.bhk);
      }

      // Commercial only (no propertyType / bhk)
      if (activeType === "commercial") {
        form.append("propertyType", "Commercial");
      }

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
          description: formData.description,
        })
      );

      if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }
      formData.galleryImages.forEach((file) => form.append("images", file));

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl">
        {/* Toggle Tabs */}
        <div className="flex w-full bg-gray-200 rounded-t-xl overflow-hidden mb-0">
          <button
            type="button"
            onClick={() => setActiveType("commercial")}
            className={`flex-1 py-3 font-semibold transition ${
              activeType === "commercial"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Commercial Property
          </button>
          <button
            type="button"
            onClick={() => setActiveType("residential")}
            className={`flex-1 py-3 font-semibold transition ${
              activeType === "residential"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Residential Property
          </button>
        </div>

        {/* Form Container */}
        <div
          className={`rounded-b-xl rounded-tr-xl shadow-xl p-8 ${
            activeType === "commercial" ? "bg-blue-50 border-t-4 border-blue-600" : "bg-purple-50 border-t-4 border-purple-600"
          }`}
        >
          {error && (
            <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded">
              {error}
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.form
              key={activeType}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Title */}
              <input
  type="text"
  name="title"
  value={formData.title}
  onChange={handleChange}
  placeholder="Property Title"
  className={`w-full rounded-lg border px-4 py-3 shadow-sm 
    focus:ring-2 focus:outline-none transition 
    ${activeType === "commercial" 
      ? "border-blue-300 focus:ring-blue-500" 
      : "border-purple-300 focus:ring-purple-500"}`}
/>


              {/* Transaction */}
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

              >
                <option value="Rent">Rent</option>
                <option value="Sell">Sell</option>
                <option value="Lease">Lease</option>
              </select>

              {/* Residential only */}
              {activeType === "residential" && (
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="">Select Property Type</option>
                  <option value="Tenament">Tenament</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Apartment">Apartment</option>
                </select>
              )}

              {/* Price */}
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

                required
              />

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

                  required
                />
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area"
                  className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

                  required
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

                />
              </div>

              {/* Carpet Area */}
              <input
                type="number"
                name="carpetArea"
                value={formData.carpetArea}
                onChange={handleChange}
                placeholder="Carpet Area (sq ft)"
                className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

                required
              />

              {/* Furnished */}
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

              >
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>

              {/* Residential only */}
              {activeType === "residential" && (
                <input
                  type="number"
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                  placeholder="BHK"
                  className="w-full border rounded px-4 py-2"
                />
              )}

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className={`w-full rounded-lg border px-4 py-3 shadow-sm 
  focus:ring-2 focus:outline-none transition 
  ${activeType === "commercial"
    ? "border-blue-300 focus:ring-blue-500"
    : "border-purple-300 focus:ring-purple-500"}`}

              />

             <div>
  <label className="block text-sm font-medium mb-1">Cover Image</label>

  {!formData.coverImage ? (
    // Upload Box
    <label
      htmlFor="coverImageInput"
      className={`w-36 h-36 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition
        ${activeType === "commercial"
          ? "border-blue-300 hover:border-blue-500 bg-blue-50/30"
          : "border-purple-300 hover:border-purple-500 bg-purple-50/30"}`}
    >
      <input
        type="file"
        id="coverImageInput"
        accept="image/*"
        onChange={handleCoverImage}
        className="hidden"
      />
      <span className="text-xs text-gray-500 text-center font-medium">
        + Upload Cover
      </span>
    </label>
  ) : (
    // Preview with remove button
    <div className="relative w-36 h-36 rounded-lg overflow-hidden shadow-md group">
      <Image
        src={URL.createObjectURL(formData.coverImage)}
        alt="Cover Preview"
        fill
        unoptimized
        className="object-cover"
      />
      <button
        type="button"
        onClick={() => setFormData({ ...formData, coverImage: null })}
        className={`absolute top-1 right-1 p-1 rounded-full shadow-md text-white transition 
          opacity-0 group-hover:opacity-100
          ${activeType === "commercial"
            ? "bg-blue-600 hover:bg-red-600"
            : "bg-purple-600 hover:bg-red-600"}`}
      >
        <RxCross2 size={16} />
      </button>
    </div>
  )}
</div>



              {/* Gallery Images */}
              <div>
  <label className="block font-medium mb-2">Gallery Images (max 5)</label>
  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
    {Array.from({ length: 5 }).map((_, idx) => (
      <div key={idx} className="relative w-24 h-24">
        {/* If this slot has an image → show preview */}
        {formData.galleryImages[idx] ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md group">
            <Image
              src={URL.createObjectURL(formData.galleryImages[idx])}
              alt={`Gallery Preview ${idx}`}
              fill
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => {
                const newImages = [...formData.galleryImages];
                newImages.splice(idx, 1);
                setFormData({ ...formData, galleryImages: newImages });
              }}
              className={`absolute top-1 right-1 p-1 rounded-full shadow-md text-white transition
                opacity-0 group-hover:opacity-100
                ${activeType === "commercial"
                  ? "bg-blue-600 hover:bg-red-600"
                  : "bg-purple-600 hover:bg-red-600"}`}
            >
              <RxCross2 size={16} />
            </button>
          </div>
        ) : (
          // If empty → show upload box
          <label
            htmlFor={`galleryInput-${idx}`}
            className={`w-full h-full flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition
              ${activeType === "commercial"
                ? "border-blue-300 hover:border-blue-500 bg-blue-50/30"
                : "border-purple-300 hover:border-purple-500 bg-purple-50/30"}`}
          >
            <input
              type="file"
              id={`galleryInput-${idx}`}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const newImages = [...formData.galleryImages];
                  newImages[idx] = e.target.files[0]; // put file in correct slot
                  setFormData({ ...formData, galleryImages: newImages });
                }
              }}
              className="hidden"
            />
            <span className="text-xs text-gray-500 font-medium">+ Upload</span>
          </label>
        )}
      </div>
    ))}
  </div>
</div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white font-semibold shadow-md ${
                  activeType === "commercial"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-purple-600 hover:bg-purple-700"
                } disabled:opacity-50`}
              >
                {loading ? "Adding Property..." : "Add Property"}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
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
