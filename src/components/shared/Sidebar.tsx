import Link from "next/link";
import { FaUser, FaCog, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=" min-h-screen p-4 border-[#00ff99] border-r-4  text-white">
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 p-2 hover:bg-accent
            rounded-xl text-white hover:text-black"
          >
            <FaHome className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/user-info"
            className="flex items-center space-x-2 p-2 hover:bg-accent
            rounded-xl text-white hover:text-black"
          >
            <FaUser className="h-5 w-5" />
            <span>User Info</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-2 p-2 hover:bg-accent
            rounded-xl text-white hover:text-black"
          >
            <FaCog className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
