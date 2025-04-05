"use client"; // Add this at the top
import logo from "../../assets/profile-pictures/logo.png";
import { navItems } from "../../constants/constants";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="sticky top-0 backdrop-blur-md py-3 border-b border-neutral-700/80 z-50">
      <div className="container flex justify-between items-center">
        <div className="logo flex justify-center items-center">
          {/* <div className="flex flex-shrink-0 aspect-square h-10 mr-2 items-center">
            <img src={logo} alt="logo" />
          </div> */}
          <span className="text-xl tracking-tight">Atom-Mail</span>
        </div>
        <ul className="hidden lg:flex ml-14 space-x-12">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex space-x-12 justify-center items-center">
          <a href="#" className="rounded-md px-3 py-2 border-2">
            Sign in
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2  bg-gradient-to-r from-orange-600 to-orange-800"
          >
            Create an account
          </a>
        </div>
        <div
          className="icon justify-end lg:hidden md:flex items-center"
          onClick={toggleDropDown}
        >
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden flex flex-col justify-center items-center p-12 w-full fixed right-0 top-16 bg-neutral-900">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="p-4">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-3 justify-center items-center mt-3">
            <a href="#" className="rounded-md px-3 py-2 border-2">
              Sign in
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2  bg-gradient-to-r from-orange-600 to-orange-800"
            >
              Create an account
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
