"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCog, FaHome, FaSignOutAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <div className=" min-h-screen p-4 border-[#00ff99] border-r-4  text-white bg-[#111827]">
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            className={`flex items-center space-x-2 p-2 rounded-xl ${
              isActive("/")
                ? "underline text-accent "
                : "hover:text-accent hover:underline"
            }`}
          >
            <FaHome className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center space-x-2 p-2 rounded-xl ${
              isActive("/dashboard")
                ? "underline text-accent "
                : "hover:text-accent hover:underline"
            }`}
          >
            <LuLayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/user-info"
            className={`flex items-center space-x-2 p-2 rounded-xl ${
              isActive("/dashboard/user-info")
                ? "underline text-accent "
                : "hover:text-accent hover:underline"
            }`}
          >
            <FaUser className="h-5 w-5" />
            <span>User Info</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-2 p-2 rounded-xl ${
              isActive("/dashboard/settings")
                ? "underline text-accent "
                : "hover:text-accent hover:underline"
            }`}
          >
            <FaCog className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      {/* Sign Out Button */}
      <button
        onClick={() => signOut()}
        className="flex items-center space-x-2 p-2 hover:text-accent
            rounded-xl text-white hover:underline "
      >
        <FaSignOutAlt className="h-5 w-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;
