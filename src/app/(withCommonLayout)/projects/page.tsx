import ProjectCard from "@/components/shared/ProjectCard";
import SliderProject from "@/components/shared/SliderProject";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 🟢 Fetch projects from backend
const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [] }; // Return empty array if fetch fails
  }
};

// 🟢 Generate metadata dynamically based on project data
export async function generateMetadata(): Promise<Metadata> {
  const projects = await fetchProjects();

  if (!projects?.data?.length) {
    return {
      title: "Gopal Basak | Projects",
      description:
        "Explore my latest projects in React, Next.js, and TypeScript.",
      keywords:
        "React, Next.js, MERN Stack, TypeScript, JavaScript, Web Developer, Portfolio",
    };
  }

  const firstProject = projects.data[0]; // Get first project as reference

  return {
    title: `${firstProject.title} | Projects - Gopal Basak`,
    description: firstProject.description || "Check out my latest projects.",
    keywords: `Projects, Portfolio, ${
      firstProject.title
    }, ${firstProject.stack.join(", ")}`,
    openGraph: {
      title: `${firstProject.title} | Projects`,
      description: firstProject.description,
      url: "https://yourwebsite.com/projects",
      images: [
        {
          url: firstProject.image || "/default-image.jpg",
          width: 800,
          height: 600,
          alt: firstProject.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: firstProject.title,
      description: firstProject.description,
      images: [firstProject.image || "/default-image.jpg"],
    },
  };
}

// 🟢 Projects Page Component
const Projects = async () => {
  const projects = await fetchProjects();

  return (
    <div className=" my-20">
      <div>
        <SliderProject projects={projects} />
      </div>
      <div className="container mx-auto mt-20">
        <ProjectCard projects={projects} />
      </div>
    </div>
  );
};

export default Projects;
