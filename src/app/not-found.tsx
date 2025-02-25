"use client";

import notFound from "./Animation - 1740419068225.json";
import Lottie from "lottie-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <i className="bi bi-truck flex p-3 text-[40px] text-primary-color">
        <Lottie
          className="md:h-[500px] md:w-[500px]"
          animationData={notFound}
        />
      </i>
      <div>
        <Link href="/" passHref>
          <p className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-xl group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#5e05e9] group-hover:-rotate-180 ease"></span>
              <span className="relative">Home</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
