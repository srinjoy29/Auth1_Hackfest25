"use client"; // Add this at the top
const Hero = () => {
  return (
    <section className="pt-20 pb-10">
      <div className="container flex flex-col items-center mt-6 lg:mt-12 max-w-7xl">
        <h1 className="tracking-wide text-4xl sm:text-6xl lg:text-7xl text-center">
        AI-Powered Smart {" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Email Automation for Atom Mail
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
  Unlock your creativity and build stunning VR apps effortlessly with our powerful development tools. Start today and transform your ideas into immersive experiences!
</p>

        <div className="flex justify-center my-10">
          <a
            href="#"
            className="rounded-md px-3 py-2 mx-3 bg-gradient-to-r from-orange-600 to-orange-800"
          >
            Start for free
          </a>
          <a href="#" className="rounded-md px-3 py-2 mx-3 border">
            Documentation
          </a>
        </div>
        <div className="mt-10 flex justify-center ">
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
