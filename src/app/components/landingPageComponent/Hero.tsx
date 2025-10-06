"use client";
import { useEffect, useState } from "react";

const LOCATIONS = [
     "Search in Alkapuri...",
    "Find homes in Race Course Circle...",
    "Explore Akota properties...",
    "Discover Atladara offices...",
    "Browse Sayajigunj listings...",
    "Locate in Vishwamitri...",
    "Search Bapod area...",
    "Find your place in Gotri...",
    "Explore Makarba homes...",
    "Search luxury apartments...",
    "Find office spaces...",
    "Discover dream homes...",
    "Browse premium properties...",
    "Locate perfect workspace...",
    "Search modern apartments...",
    "Find commercial spaces...",
    "Explore residential plots...",
  ];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [priceRange, setPriceRange] = useState("5k");
  const [locationError, setLocationError] = useState("");
  const [transactionType, setTransactionType] = useState("Rent");

  // Custom Typewriter State
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


 useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = LOCATIONS[currentIndex];
      
      if (!isDeleting && charIndex < currentText.length) {
        // Typing forward
        setCurrentPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        setCurrentPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        // Finished typing, start deleting after pause
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % LOCATIONS.length);
      }
    }, isDeleting ? 50 : 100); // Faster when deleting

    return () => clearTimeout(timeout);
  }, [currentIndex, charIndex, isDeleting]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setLocationError(""); // Reset error when the user starts typing
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
  };

  const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(e.target.value);
  };

  const handleSearch = () => {
    if (location.trim() === "") {
      setLocationError("Location is required");
    } else {
      console.log("Search initiated with: ", { location, propertyType, priceRange, transactionType });
      // Proceed with search logic (maybe API call)
    }
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/HeroBgImg.webp')" }}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4 sm:px-8">
        {/* Main Heading with Enhanced Animation */}
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Find Your Dream Office or Home
        </h1>

        {/* Sub Heading with Fade In */}
        <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
          We specialize in buying, selling, and renting top-tier homes and office spaces tailored to your needs.
        </p>

        {/* Search Form with Engaging Elements */}
        <div
  className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-6 
             animate__animated animate__fadeIn animate__delay-3s w-full max-w-5xl mx-auto"
>
  {/* Location Input */}
  <div className="relative flex-1 min-w-[260px] sm:min-w-[300px]">
    <input
      type="text"
      placeholder={locationError ? locationError : currentPlaceholder}
      value={location}
      onChange={handleLocationChange}
      className={`w-full px-6 py-3 rounded-lg border-2 
        transition-all duration-300 ease-in-out 
        focus:outline-none backdrop-blur-md
        ${
          locationError
            ? "border-red-600 focus:ring-2 focus:ring-red-500 text-red-500 placeholder-red-400"
            : "border-blue-600 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-black/50"
        }`}
    />
  </div>

  {/* Property Type */}
  <select
    value={propertyType}
    onChange={handlePropertyTypeChange}
    className="flex-1 min-w-[180px] px-6 py-3 rounded-lg border-2  
               focus:ring-2 focus:ring-blue-500 focus:border-blue-600 
               transition-all duration-300 ease-in-out 
               bg-black/50 text-white hover:bg-black/60"
  >
    <option value="All">All Properties</option>
    <option value="House">House</option>
    <option value="Office">Office</option>
  </select>

  {/* Price Range */}
  <select
    value={priceRange}
    onChange={handlePriceRangeChange}
    className="flex-1 min-w-[180px] px-6 py-3 rounded-lg border-2  
               focus:ring-2 focus:ring-blue-500 focus:border-blue-600 
               transition-all duration-300 ease-in-out 
               bg-black/50 text-white hover:bg-black/60"
  >
    <option value="5k">Up to 5,000</option>
    <option value="10k">Up to 10,000</option>
    <option value="20k">Up to 20,000</option>
    <option value="30k">Up to 30,000</option>
    <option value="50k">Up to 50,000</option>
    <option value="50k+">More than 50,000</option>
  </select>

  {/* Transaction Type */}
  <select
    value={transactionType}
    onChange={handleTransactionTypeChange}
    className="flex-1 min-w-[130px] px-6 py-3 rounded-lg border-2  
               focus:ring-2 focus:ring-blue-500 focus:border-blue-600 
               transition-all duration-300 ease-in-out 
               bg-black/50 text-white hover:bg-black/60"
  >
    <option value="Rent">Rent</option>
    <option value="Buy">Buy</option>
  </select>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 
               hover:bg-blue-700 transition-all duration-300 ease-in-out 
               shadow-md hover:shadow-lg min-w-[120px]"
  >
    Search
  </button>
</div>

      </div>
    </section>
  );
}
