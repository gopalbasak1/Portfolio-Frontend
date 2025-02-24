"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

type UserProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const MobileNav = ({ session }: { session: UserProps | null }) => {
  const pathname = usePathname();
  const isAuthenticated = !!session;

  const links = [
    { name: "home", path: "/" },
    { name: "resume", path: "/resume" },
    { name: "projects", path: "/projects" },
    { name: "blogs", path: "/blogs" },
    { name: "contact", path: "/contact" },
  ];

  if (!isAuthenticated) {
    links.push(
      { name: "login", path: "/login" },
      { name: "register", path: "/register" }
    );
  }

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-20 mb-12 text-center">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Gopal Basak<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-6">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname && "text-accent border-b-2 border-accent"
              } text-xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && session?.user && (
            <div className="mt-8 flex flex-col items-center">
              <Image
                src={session.user.image || "/default-avatar.png"}
                width={50}
                height={50}
                alt="User"
                className="w-[60px] h-[60px] rounded-full border-2 border-accent"
              />

              <Link
                href="/dashboard"
                className="mt-4 text-lg hover:text-accent transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="mt-4 text-red-500 text-lg hover:text-red-400 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
