"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  createProject,
  uploadImageToCloudinary,
} from "@/utils/actions/createProjects";
import { Session } from "next-auth";

export type ProjectData = {
  title?: string | null;
  description?: string | null;
  liveLink?: string;
  image?: FileList | null;
  session: string | null;
  category: string;
  stack: string;
  github: string;
};

const ProjectForm = ({ session }: { session: Session | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("ss", session?.user?.accessToken);

  const onSubmit = async (data: ProjectData) => {
    try {
      setLoading(true);
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        imageUrl = await uploadImageToCloudinary(file);
      }
      const userId = session?.user?.id;
      const accessToken = session?.user?.accessToken;
      // ✅ Convert stack string to an array of objects
      const stackArray = data.stack
        .split(",") // Split by commas
        .map((tech) => ({ name: tech.trim() }))
        .filter((item) => item.name.length > 0);
      const formattedData = {
        title: data.title,
        description: data.description,
        liveLink: data.liveLink,
        image: imageUrl || "",
        github: data.github,
        category: data.category,
        stack: stackArray,
      };
      console.log(formattedData, userId, accessToken);
      // Pass token to the server function
      const res = await createProject(formattedData, userId, accessToken);
      console.log("djd", res);
      if (res.success) {
        toast.success("Project created successfully!");
        router.push("/dashboard/project/allProject");
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6 bg-[#111827]"
    >
      <div className="container mx-auto flex justify-center bg-none">
        <div className="w-full max-w-md p-10 rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6">
            Create Your Project
          </h3>
          <p className="text-red-500 text-[14px] font-bold text-center my-2 underline">
            Google & GitHub logged-in users cannot create projects.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              className="rounded-xl"
              type="text"
              id="title"
              {...register("title", { required: true })}
              placeholder="Project Title"
            />
            {errors.title && <p className="text-red-500">Title is required</p>}

            <Input
              className="rounded-xl"
              type="text"
              id="liveLink"
              {...register("liveLink", { required: true })}
              placeholder="Project Live Link"
            />
            {errors.liveLink && (
              <p className="text-red-500">Project live link is required</p>
            )}

            {/* New field for GitHub URL */}
            <Input
              className="rounded-xl"
              type="text"
              id="github"
              {...register("github", { required: true })}
              placeholder="GitHub Repository URL"
            />
            {errors.github && (
              <p className="text-red-500">GitHub URL is required</p>
            )}

            {/* New field for Category (select input) */}
            <select
              id="category"
              {...register("category", { required: true })}
              className="w-full p-2 mt-1 rounded-xl bg-gray-700 text-white"
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mern-Stack">Mern-Stack</option>
              <option value="Full-stack">Full-stack</option>{" "}
              {/* ✅ Ensure lowercase "s" */}
              <option value="Mobile-App">Mobile-App</option>
            </select>

            {/* New field for Stack (comma separated input) */}
            <Input
              className="rounded-xl"
              type="text"
              id="stack"
              {...register("stack", { required: true })}
              placeholder="Enter stack (e.g., Html 5, Css 3, JavaScript)"
            />
            {errors.stack && <p className="text-red-500">Stack is required</p>}

            <Input
              className="rounded-xl py-2 text-[#9ca49e]"
              type="file"
              accept="image/*"
              id="image"
              {...register("image")}
            />

            <Textarea
              className="rounded-xl w-full h-48"
              id="description"
              {...register("description", { required: true })}
              placeholder="Project Description"
            />
            {errors.description && (
              <p className="text-red-500">Description is required</p>
            )}

            <Button
              type="submit"
              size="md"
              className="w-full py-2 hover:text-white/65"
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectForm;
