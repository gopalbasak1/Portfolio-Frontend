import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Project Details",
  description: "View project details",
};

type ProjectDetailsPageProps = {
  params: { projectsId: string };
};

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { projectsId } = params;
  console.log("Project ID:", projectsId);

  if (!projectsId) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error: Project ID is missing
      </div>
    );
  }

  // Fetch project details from the backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  const projectResponse = await res.json();
  // Assume response structure: { success: true, data: { ... } }
  const project = projectResponse.data;
  if (!project) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        No project data available.
      </div>
    );
  }

  const { title, description, image, liveLink, github, stack, category } =
    project;

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile: Image at top; Desktop: Image on right */}
        <div className="lg:hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-xl mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl mb-4">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="text-4xl font-medium text-transparent text-outline ">
                {category}
              </div>
              <h1 className="text-3xl font-bold text-white capitalize">
                {title}
              </h1>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {stack &&
                    stack.map((item: any, index: number) => (
                      <li key={index} className="text-lg text-accent">
                        {item.name}
                        {index !== stack.length - 1 && ","}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                {liveLink && (
                  <Link href={liveLink}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center">
                          <BsArrowUpRight className="text-white text-2xl hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {github && (
                  <Link href={github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center">
                          <BsGithub className="text-white text-2xl hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github Repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: Image Section */}
          <div className="hidden lg:block w-full lg:w-1/2">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl">
                No Image Available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8">
        <p className="text-white/80 text-justify">{description}</p>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
