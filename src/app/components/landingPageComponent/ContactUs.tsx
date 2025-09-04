'use client'
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Let’s Talk About Your Goals 🚀
            </h2>
            <p className="text-gray-600 mt-2">
              Schedule a free consultation. We’ll get back to you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group 1: Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Group 2: Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              >
                <option value="">Select a Service</option>
                <option value="consulting">Consulting</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
              </select>
            </div>

            {/* Group 3: Message */}
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your requirements..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Submit Request <Send size={18} />
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-10 gap-10 flex text-center space-y-2 text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Phone size={18} />+91 81607 02453
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail size={18} /> info@broks.com
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin size={18} /> Vadodara, Gujarat
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
