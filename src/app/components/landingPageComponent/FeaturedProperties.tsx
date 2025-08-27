"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Star, ArrowRight, Search } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Modern Office Space",
    image: "/static1.png",
    price: "₹2,500/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.8,
    tags: ["New", "Verified"],
  },
  {
    id: 2,
    title: "Luxury Villa",
    image: "/static2.png",
    price: "₹5,000/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.9,
    tags: ["Premium"],
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    image: "/static3.png",
    price: "₹1,200/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.5,
    tags: ["Budget"],
  },
  {
    id: 4,
    title: "Spacious Family Home",
    image: "/static4.png",
    price: "₹3,000/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.7,
    tags: ["Family"],
  },
  {
    id: 5,
    title: "Urban Loft",
    image: "/static5.png",
    price: "₹2,800/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.6,
    tags: ["Loft"],
  },
  {
    id: 6,
    title: "Beachfront Condo",
    image: "/static6.png",
    price: "₹4,500/mo", // Changed to INR
    location: "Vadodara, Gujarat",
    rating: 4.8,
    tags: ["Sea View"],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function Rating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "full";
    if (i === full && half) return "half";
    return "empty";
  });

  return (
    <div
      className="flex items-center gap-1 text-amber-500"
      aria-label={`Rated ${value} out of 5`}
    >
      {stars.map((t, idx) => (
        <Star
          key={idx}
          className={`h-4 w-4 ${t === "empty" ? "opacity-25" : ""}`}
          fill={t === "empty" ? "none" : "currentColor"}
        />
      ))}
      <span className="ml-1 text-xs text-black">{value.toFixed(1)}</span>
    </div>
  );
}

function PropertyCard({
  id,
  title,
  image,
  price,
  location,
  rating,
  tags = [],
}: (typeof data)[number]) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Decorative gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-200 via-sky-200 to-pink-200 blur-[10px]" />
      </div>

      {/* Media */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Top-left tags */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow ring-1 ring-black/5 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Glass info strip on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-xl w-36 bg-white/10 p-3 shadow backdrop-blur">
            <div className="flex items-center justify-between">
              <Rating value={rating} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{location}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-semibold text-gray-900">{price}</p>
          <button className="group/btn inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50">
            View details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Subtle overlay on card hover */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
    </motion.article>
  );
}

export default function FeaturedProperties() {
  const [query, setQuery] = useState("");
  const properties = data;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [properties, query]);

  return (
    <section className="relative bg-white py-16">
      {/* Light gradient top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 " />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Featured Properties
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our handpicked selection of premium properties available for
            sale or rent.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
            No properties match your search.
          </div>
        )}
      </div>
    </section>
  );
}
