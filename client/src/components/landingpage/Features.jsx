"use client"; // Add this at the top

import { features } from "../../constants/constants";
const Features = () => {
  return (
    <section className="mt-20 pt-10 relative min-h-[800px]">
      <div className="container text-center mt-5 border-b border-neutral-800">
        <span className="bg-neutral-900 uppercase text-sm rounded-full h-6 px-2 py-1 text-orange-600 font-medium">
          Features
        </span>
        <h2 className="mt-10 text-3xl sm:text-5xl lg:text-6xl">
          Exclusive{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Features
          </span>
        </h2>
        <div className="flex mt-10 lg:mt-20 flex-wrap ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 px-4 text-start"
            >
              <div className="flex">
                <div className="h-10 aspect-square rounded-full mx-6 p-2 bg-neutral-900 text-orange-700 flex justify-center items-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl mb-6 mt-1">{feature.text}</h3>
                  <p className="p-2 mb-20 text-md text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
