import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const UpdateProjectModal = ({ project, onClose }) => {
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [liveLink, setLiveLink] = useState(project.liveLink || "");
  const [github, setGithub] = useState(project.github || "");
  const [category, setCategory] = useState(project.category || "");
  const [stack, setStack] = useState(
    project.stack?.map((s) => s.name).join(", ") || ""
  );
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!liveLink.trim()) newErrors.liveLink = "Live link is required";
    if (!github.trim()) newErrors.github = "GitHub URL is required";
    if (!category) newErrors.category = "Category is required";
    if (!stack.trim()) newErrors.stack = "Stack is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      let imageUrl = project.image;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Image upload failed");
        }
        imageUrl = data.secure_url;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            liveLink,
            github,
            category,
            stack: stack.split(",").map((s) => ({ name: s.trim() })),
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      toast.success("Project updated successfully!");
      onClose(); // Close modal after update
    } catch (error) {
      toast.error(error.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="fixed inset-0 bg-[#111827] bg-opacity-50 flex justify-center items-center px-4"
    >
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          Update Project
        </h2>

        <div className="space-y-2">
          {/* Title */}
          <label className="text-white">Project Title *</label>
          <Input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          {/* Live Link */}
          <label className="text-white">Live Link *</label>
          <Input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
          {errors.liveLink && <p className="text-red-500">{errors.liveLink}</p>}

          {/* GitHub URL */}
          <label className="text-white">GitHub Repository URL *</label>
          <Input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            placeholder="GitHub Repository URL"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          {errors.github && <p className="text-red-500">{errors.github}</p>}

          {/* Category */}
          <label className="text-white">Category *</label>
          <select
            className="w-full p-2 rounded-xl bg-gray-700 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Mern-Stack">Mern-Stack</option>
            <option value="Full-stack">Full-stack</option>
            <option value="Mobile-App">Mobile-App</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}

          {/* Stack */}
          <label className="text-white">Tech Stack (comma-separated) *</label>
          <Input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            placeholder="Enter stack (e.g., Html 5, Css 3, JavaScript)"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          />
          {errors.stack && <p className="text-red-500">{errors.stack}</p>}

          {/* Description */}
          <label className="text-white">Project Description *</label>
          <Textarea
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}

          {/* Image Upload */}
          <label className="text-white">Upload New Image</label>
          <Input
            type="file"
            className="w-full p-2 bg-gray-700 text-white rounded-xl"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateProjectModal;
