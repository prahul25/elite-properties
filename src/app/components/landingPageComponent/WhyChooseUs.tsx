"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Shield, User, DollarSign } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
};

const points = [
  {
    icon: <MapPin className="h-6 w-6 text-indigo-500" />,
    title: "Local Expertise",
    description: "Deep knowledge of local markets and neighborhoods to help you make informed decisions.",
  },
  {
    icon: <User className="h-6 w-6 text-green-500" />,
    title: "Trusted Advisors",
    description: "Honest guidance and transparent communication throughout the process.",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
    title: "Investment Expertise",
    description: "Strategic advice to maximize your property investment returns.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-semibold text-gray-900">Why Choose Us</h2>
          <p className="mt-3 text-lg text-gray-600">
            With over 15 years of experience in the real estate market, we provide personalized service tailored to your unique needs.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
        </motion.div>

        {/* Flex Section with Image and Points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Left: Image Section */}
          <motion.div
            variants={boxVariants}
            className="flex justify-center lg:justify-start"
          >
            <motion.img
              src="/whyChoseUs.png" // Replace this with the correct path to the image in your public folder
              alt="Person"
              className="rounded-xl shadow-xl max-w-sm transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Right: Text Section */}
          <motion.div
            variants={boxVariants}
            className="space-y-6 text-center lg:text-left flex-1"
          >
            <motion.h3
              variants={textVariants}
              className="text-2xl font-semibold text-gray-900"
            >
              Our team of experts is committed to helping you achieve your real estate goals.
            </motion.h3>

            {/* Points List */}
            <motion.div
              variants={textVariants}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1"
            >
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="p-4 bg-indigo-100 rounded-full">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{point.title}</h4>
                    <p className="mt-2 text-sm text-gray-600">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
