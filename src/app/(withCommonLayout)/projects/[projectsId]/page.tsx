import ProjectsDetails from "@/components/shared/ProjectsDetails";
import { Metadata } from "next";

// Import the correct component

export const metadata: Metadata = {
  title: "Project Details",
  description: "View project details",
};

type ProjectDetailsPageProps = {
  params: { projectsId: string };
};

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { projectsId } = params;

  if (!projectsId) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error: Project ID is missing
      </div>
    );
  }

  // Fetch project details
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  const projectResponse = await res.json();
  const project = projectResponse.data;

  if (!project) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        No project data available.
      </div>
    );
  }

  return <ProjectsDetails project={project} />;
};

export default ProjectDetailsPage;
