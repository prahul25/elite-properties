"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Broks
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/pages/properties" className="hover:text-blue-600 transition">
            Properties
          </Link>
          <Link href="/pages/services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/pages/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link
            href="/pages/contact"
            className="ml-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-800"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-blue-600" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/pages/properties" className="block hover:text-blue-600" onClick={toggleMenu}>
            Properties
          </Link>
          <Link href="/pages/services" className="block hover:text-blue-600" onClick={toggleMenu}>
            Services
          </Link>
          <Link href="/pages/about" className="block hover:text-blue-600" onClick={toggleMenu}>
            About
          </Link>
          <Link
            href="/pages/contact"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
