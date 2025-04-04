"use client"; // Add this at the top
import {
  resourcesLinks,
  platformLinks,
  communityLinks,
} from "../../constants/constants";
const Footer = () => {
  return (
    <section>
      <div className="container mt-20 py-10 grid grid-cols-2 lg:grid-cols-3 gap-4 border-t border-neutral-700">
        <div>
          <h3 className="font-semibold mb-4">Resources </h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Platform </h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Community </h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="programmer w-full bg-neutral-900 py-5 flex justify-center items-center font-medium tracking-wider">
        Coded by &lt;
        <a
          href="https://www.linkedin.com/in/ahmed-ashraf55559"
          target="_blank"
          rel="noopener noreferrer"
          className="text-transparent bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text"
        >
          AUTH1
        </a>
        /&gt;
      </div>
    </section>
  );
};

export default Footer;
