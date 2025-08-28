"use client";
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

// Social Media Config
const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    Icon: Facebook,
    hover: "hover:text-[#1877F2] hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(24,119,242,.25)]",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    Icon: Twitter,
    hover: "hover:text-[#1DA1F2] hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(29,161,242,.25)]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    Icon: Instagram,
    hover: "hover:text-[#E1306C] hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(225,48,108,.25)]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    Icon: Linkedin,
    hover: "hover:text-[#0A66C2] hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(10,102,194,.25)]",
  },
];

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      {/* subtle top divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-8">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand + About */}
          <div className="flex-1 min-w-[260px] space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orange-400">
              Broks
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Broks is a premier real estate agency specializing in luxury properties, residential homes, and investment opportunities. With 15+ years of experience, we deliver exceptional service.
            </p>

            {/* Socials */}
            <nav aria-label="Social media" className="pt-2">
              <ul className="flex flex-wrap gap-3">
                {socials.map(({ name, href, Icon, hover }) => (
                  <li key={name}>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className={[
                        "group inline-flex h-10 w-10 items-center justify-center rounded-full",
                        "bg-white/5 text-white/90 ring-1 ring-white/10 transition-all duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 focus-visible:ring-offset-indigo-950",
                        hover,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Links + Newsletter */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 flex-1">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Quick Links</h3>
              <ul className="space-y-2 text-white/85">
                {[
                  { label: "Home", href: "/home" },
                  { label: "Properties", href: "/properties" },
                  { label: "Services", href: "/services" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 transition-colors hover:text-orange-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40 group-hover:bg-orange-400" />
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Services</h3>
              <ul className="space-y-2 text-white/85">
                {[
                  { label: "Buy Property", href: "/buy" },
                  { label: "Sell Property", href: "/sell" },
                  { label: "Rental Services", href: "/rentals" },
                  { label: "Investment Consultation", href: "/investment" },
                ].map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 4 }}
                      className="transition-colors hover:text-orange-400"
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Newsletter</h3>
              <p className="text-sm text-white/75">
                Subscribe for property updates and market insights.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-2"
              >
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-lg bg-white text-black/90 placeholder-black/50 px-3 py-2
                             focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-2 py-2 font-medium text-white
                             shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                             focus:ring-orange-400 focus:ring-offset-indigo-950 transition"
                >
                  <Send />
                </button>
              </form>
              <p className="text-xs text-white/50">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
