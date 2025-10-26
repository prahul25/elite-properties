"use client";
import React from "react";
import { motion, easeInOut } from "framer-motion";
import { MapPin, User, DollarSign, Headphones } from "lucide-react";
import Image from "next/image";

// Animation config
const transitionConfig = {
  duration: 0.6,
  ease: easeInOut,
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: transitionConfig },
};

const boxVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: transitionConfig },
};

const points = [
  {
    icon: <MapPin className="h-6 w-6 text-indigo-500" />,
    title: "Local Expertise",
    description:
      "Deep knowledge of local markets and neighborhoods to help you make informed decisions.",
  },
  {
    icon: <User className="h-6 w-6 text-blue-500" />,
    title: "Trusted Advisors",
    description:
      "Honest guidance and transparent communication throughout the process.",
  },
  {
    icon: <Headphones className="h-6 w-6 text-purple-500" />,
    title: "Personalized Service",
    description:
      "Tailored approach to meet your specific needs and preferences.",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
    title: "Investment Expertise",
    description:
      "Strategic advice to maximize your property investment returns.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Flex Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Left: Image */}
          <motion.div
            variants={boxVariants}
            className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Image
              src="/whyChoseUs.png"
              alt="Team member"
              width={448}
              height={560}
              className="rounded-lg shadow-xl max-w-sm lg:max-w-md transition-transform duration-500 hover:scale-105"
              priority
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={boxVariants}
            className="flex-1 space-y-6 lg:space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              With over 15 years of experience in the real estate market, we
              provide personalized service tailored to your unique needs
            </p>

            {/* Feature Points */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  variants={boxVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-indigo-500"
                >
                  <div className="p-4 bg-indigo-100 rounded-full">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {point.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
