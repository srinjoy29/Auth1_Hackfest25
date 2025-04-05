"use client"; // Add this at the top
import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../../constants/constants";

const Pricing = () => {
  return (
    <section>
      <div className="container mt-20">
        <h2 className=" text-3xl sm:text-5xl lg:text-6xl text-center my-8">
          Pricing
        </h2>
        <div className="flex flex-wrap">
          {pricingOptions.map((option, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2 ">
              <div className="p-10 border border-neutral-700 rounded-md min-h-[575px]">
                <p className="text-4xl mb-8">
                  {option.title}
                  {option.title === "Pro" ? (
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text text-lg ml-2 mb-4">
                      (Most Popular)
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="mb-8">
                  <span className="text-5xl mt-6 mr-2">{option.price}</span>
                  <span className="text-neutral-400">/Month</span>
                </p>
                <ul>
                  {option.features.map((feature, index) => (
                    <li key={index} className="mt-8 flex items-center">
                      <CheckCircle2 />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-orange-500 border border-orange-700 hover:bg-orange-700 hover:text-white py-2 px-4 rounded-md mt-20 block text-center transition duration-300"
                >
                  Subscribe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
