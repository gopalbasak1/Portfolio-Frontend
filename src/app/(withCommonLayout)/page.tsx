import Photo from "@/components/shared/Photo";
import Socials from "@/components/shared/Socials";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";

import React from "react";
import { FiDownload } from "react-icons/fi";

const HomePage = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl font-bold">React Developer</span>
            <h1 className="h1 mb-6">
              Hello I'm <br /> <span className="text-accent">Gopal Basak</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              Passionate Mern Stack Developer | Expert in React, NextJs,
              TypesScript, JavaScript | Always Learning New Tech.
            </p>
            {/* button */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              {/* socials */}
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
};

export default HomePage;
