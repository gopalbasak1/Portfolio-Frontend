import ProjectsDetails from "@/components/shared/ProjectsDetails";

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`
  );
  const projectData = await res.json();
  console.log(projectData);
  const project = projectData.data;
  return (
    <div>
      <ProjectsDetails project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
