import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const UpdateBlogModal = ({ blog, onClose }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [category, setCategory] = useState(blog.category);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let imageUrl = blog.image;

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
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
      className="fixed inset-0 bg-[#111827] bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          Update Blog
        </h2>

        <Input
          type="text"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-xl"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="text"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-xl"
          placeholder="Live Link"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Textarea
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-xl"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Input
          type="file"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-xl"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl mr-2"
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

export default UpdateBlogModal;
