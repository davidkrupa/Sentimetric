import Image from "next/image";
import Link from "next/link";

import logo from "../lib/assets/sentimetric-logo.webp";

const Footer = () => {
  return (
    <footer className="m-4 w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-end sm:justify-between">
          <Link
            href="https://sentimetric.net/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <div className="flex justify-center items-center size-9">
              <Image src={logo} width={35} height={35} alt="Sentimetric logo" />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-100">
              Sentimetric
            </span>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-slate-500">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/policy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-slate-500 sm:mx-auto lg:my-8" />
        <span className="block text-sm sm:text-center text-slate-500">
          © 2024{" "}
          <Link href="https://sentimetric.net" className="hover:underline">
            Sentimetric™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
