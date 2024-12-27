import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white p-8 relative">
      {/* About Us Section */}
      <div className="max-w-7xl mx-20 flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Text Section */}
        <div className="md:w-1/2 pl-4">
          <h4 className="text-orange-500 font-bold uppercase text-sm mb-6  border-l-4 border-orange-500 p-2">About Us</h4>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Welcome to Wosol-<br />Scaffolding Services
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Wosol is a leading scaffolding services provider in Saudi Arabia, offering a wide range of solutions, including scaffolding rental, design, contracting, erection, and manpower supply. With a strong commitment to safety, quality, and efficiency, we support various construction projects across Saudi Arabia, including major cities like Riyadh, Jeddah, Makkah, and Jubail.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-[#DF573E] transform translate-x-6 translate-y-6 -z-10"></div>
          <Image
            src="/Image.png"
            alt="Building"
            className="relative w-full h-[600px] object-cover"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>

      <div className="max-w-5xl mx-20 mt-8 bottom-28 relative z-10 pl-4">
        <div className="bg-gray-100 p-6 border-l-8 border-orange-500  flex justify-between items-center transform -translate-y-12 z-20">
          <h3 className="text-[#DF573E] font-bold text-lg uppercase">Our Services</h3>
          <div className="flex items-center gap-8">
            {/* Rent */}
            <div className="flex flex-col items-center">
              <Image
                src="/Rent.png"
                alt="Rent Icon"
                width={40}
                height={40}
                className="mb-2"
              />
              <p className="text-[#DF573E]  font-semibold">Rent</p>
            </div>

         
            <div className="h-20 w-[1px] bg-[#DEDEDE]"></div>

   
            <div className="flex flex-col items-center">
              <Image
                src="/Purchase.png"
                alt="Sale Icon"
                width={40}
                height={40}
                className="mb-2"
              />
              <p className="text-[#DF573E]  font-semibold">Sale</p>
            </div>

            <div className="h-20 w-[1px] bg-[#DEDEDE]"></div>


            {/* Purchase */}
            <div className="flex flex-col items-center">
              <Image
                src="/Sale.png" // Path to the purchase icon in the public folder
                alt="Purchase Icon"
                width={40}
                height={40}
                className="mb-2"
              />
              <p className="text-[#DF573E]  font-semibold">Purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
