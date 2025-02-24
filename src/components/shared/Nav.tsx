"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const pathname = usePathname();

  const links = [
    { name: "home", path: "/" },

    { name: "resume", path: "/resume" },
    { name: "projects", path: "/projects" },
    { name: "blogs", path: "/blogs" },
    { name: "contact", path: "/contact" },
  ];

  // Add login/register links only if user is NOT authenticated
  if (!isAuthenticated) {
    links.push(
      { name: "login", path: "/login" },
      { name: "register", path: "/register" }
    );
  }

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={`${
            link.path === pathname && "text-accent border-b-2 border-accent"
          } capitalize font-medium hover:text-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
