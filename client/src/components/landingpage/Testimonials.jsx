"use client"; // Add this at the top
import { testimonials } from "../../constants/constants";
const Testimonials = () => {
  return (
    <section>
      <div className="container mt-20 pb-20">
        <h2 className=" text-3xl sm:text-5xl lg:text-6xl text-center my-8">
          What people are saying
        </h2>
        <div className="flex flex-wrap ">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 py-3  w-full sm:w-1/2 lg:w-1/3">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-md text-neutral-400">
                <p>{testimonial.text}</p>
                <div className="mt-8 flex items-start">
                  <img
                    src={testimonial.image}
                    alt="testimonial"
                    className="aspect-square h-10 border border-neutral-400 rounded-full mr-6"
                  />
                  <div className="">
                    <h6>{testimonial.user}</h6>
                    <span className="text-sm italic text-neutral-600">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
