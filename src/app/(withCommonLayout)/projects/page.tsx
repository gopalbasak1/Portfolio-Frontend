import ProjectCard from "@/components/shared/ProjectCard";
import SliderProject from "@/components/shared/SliderProject";

const Projects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    cache: "no-store", // Ensure fresh data
  });

  const projects = await res.json();
  console.log(projects);
  return (
    <div>
      <SliderProject projects={projects} />
      <div className="container mx-auto mt-20">
        <ProjectCard projects={projects} />
      </div>
    </div>
  );
};

export default Projects;
