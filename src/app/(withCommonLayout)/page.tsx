/* eslint-disable react/no-unescaped-entities */
import Photo from "@/components/shared/Photo";
import Socials from "@/components/shared/Socials";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Services from "./services/page";
import SkillPage from "@/components/shared/SkillPage";

import Link from "next/link";
import HomeProjectCard from "@/components/shared/HomeProjectCard";
import { Project } from "@/types";

const HomePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    cache: "no-store",
  });
  const projects = await res.json();

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
              <a
                href="https://drive.google.com/uc?export=download&id=1gio-qf0cq7PHZP6eLXZm7RQXRbShnDVk"
                download
                className="no-underline"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
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

      <div>
        <SkillPage />
      </div>

      {/* Projects */}
      <div className="container mx-auto mt-[9rem]  ">
        <div>
          <h2 className="text-4xl text-center mb-10">
            {" "}
            My <span className="text-accent mb-5">Projects</span>
          </h2>
        </div>
        <hr className="border-t-2 border-transparent bg-gradient-to-r from-white/20  to-[#6dc5a2] animate-pulse h-1" />

        <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects?.data?.slice(0, 3)?.map((project: Project) => (
            <HomeProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>

      {/* Link to All Projects */}
      <div className="text-center mt-8">
        <Link href="/projects">
          <Button variant="outline" size="lg" className="uppercase">
            View All Projects
          </Button>
        </Link>
      </div>

      <div className="mt-[11rem] container">
        <div className="mb-[7.5rem]">
          <h2 className="text-center text-4xl font-bold text-white my-10">
            <span className="">Explore</span>
            <span className="text-accent hover:text-white ml-5">Services</span>
          </h2>
        </div>
        <div className="my-10">
          <Services />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
