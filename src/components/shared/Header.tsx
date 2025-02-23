"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

const Header = ({ session }: { session: UserProps | null }) => {
  const isAuthenticated = !!session;

  return (
    <header className="py-6 xl:py-10 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Gopal Basak
            <span className="text-accent">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav isAuthenticated={isAuthenticated} />

          {isAuthenticated && (
            <Popover>
              <PopoverTrigger className="relative flex items-center">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={session.user?.image || "/default-avatar.png"}
                      width={30}
                      height={30}
                      alt="User"
                      className="w-[50px] h-[50px] rounded-full cursor-pointer object-cover border-2 border-accent transition-transform hover:scale-105"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
                    {session.user?.name || "User"}
                  </TooltipContent>
                </Tooltip>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                side="bottom"
                sideOffset={10}
                className="bg-[#1c1c22] border-none text-white p-4 w-[150px] text-center shadow-lg transition-opacity duration-200 rounded-xl"
              >
                <Link
                  href="/dashboard"
                  className="block text-accent hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="mt-2 text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="xl:hidden">
          <MobileNav session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
