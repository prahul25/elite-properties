"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, BadgeCheck, Star, Users, CalendarClock } from "lucide-react";

export default function Services() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,theme(colors.blue.200/.35),transparent)] blur-3xl" />

      {/* Container */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {/* Stat pill */}
          <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 p-4 shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-indigo-500 hover:shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 group-hover:scale-105 transition">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">500+</p>
              <p className="text-xs text-gray-500">Properties Sold</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 p-4 shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-indigo-500 hover:shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 group-hover:scale-105 transition">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">1000+</p>
              <p className="text-xs text-gray-500">Happy Clients</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 p-4 shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-indigo-500 hover:shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 group-hover:scale-105 transition">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">15+</p>
              <p className="text-xs text-gray-500">Years Experience</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 p-4 shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-emerald-500 hover:shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 group-hover:scale-105 transition">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Certified Experts</p>
              <p className="text-xs text-gray-500">Real Estate</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 p-4 shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-amber-500 hover:shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100 group-hover:scale-105 transition">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">4.8/5</p>
              <p className="text-xs text-gray-500">Based on 350+ reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Our Premium Services
          </h2>
          <p className="mt-3 text-gray-600">
            Comprehensive real estate solutions tailored to your goals — from buying and selling to end‑to‑end rental management.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60"></div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Buy & Sell */}
          <motion.a
            href="#buy-sell"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative block rounded-3xl border border-gray-300 bg-white p-6 shadow-md ring-1 ring-transparent backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl  hover:ring-2 hover:ring-indigo-500"
            aria-label="Learn more about Buy & Sell Properties"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition group-hover:scale-105">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Buy & Sell Properties</h3>
            </div>
            <p className="max-w-prose text-gray-600">
              From finding your dream home to closing the deal, our team guides you through every step for a smooth, transparent transaction.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> Market analysis & pricing strategy
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> Professional staging & high‑impact listings
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> Negotiation & paperwork handled end‑to‑end
              </li>
            </ul>

            {/* corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-400/10 blur-2xl" />
          </motion.a>

          {/* Rental Services */}
          <motion.a
            href="#rental-services"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="group relative block rounded-3xl border border-gray-300 bg-white p-6 shadow-md ring-1 ring-transparent backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-indigo-500"
            aria-label="Learn more about Rental Services"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 transition group-hover:scale-105">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Rental Services</h3>
            </div>
            <p className="max-w-prose text-gray-600">
              Find the perfect rental or let us manage your property investment — tenant screening to maintenance coordination.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> Verified tenant onboarding
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> Rent collection & occupancy optimization
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> 24/7 maintenance coordination
              </li>
            </ul>

            {/* corner glow */}
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-400/10 blur-2xl" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
