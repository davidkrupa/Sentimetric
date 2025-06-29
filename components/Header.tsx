import Image from "next/image";
import Link from "next/link";

import logo from "../lib/assets/sentimetric-logo.webp";
import AccountButtons from "./AccountButtons";

const Header = () => {
  const links = [
    { name: "How it works", href: "#timeline" },
    { name: "Benefits", href: "#benefits" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="w-full py-4 absolute top-0 left-0 z-20">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex justify-start items-center gap-3">
          <div className="flex justify-center items-center size-9">
            <Image src={logo} width={35} height={35} alt="Sentimetric logo" />
          </div>
          <span className="hidden sm:inline text-2xl text-slate-100 font-semibold">
            Sentimetric
          </span>
        </Link>
        <div className="flex justify-center items-center gap-3">
          <div className="hidden md:block pr-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="mr-6 text-slate-100 hover:text-slate-300 hover:underline hover:underline-offset-4 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <AccountButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;
