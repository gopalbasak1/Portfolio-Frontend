// blogDetailsPage.tsx (or similar)
import BlogDetails from "@/components/shared/Blogs/BlogDetails";
import { Blog } from "@/types"; // Adjust the type according to your blog structure

// Fetch blog data using an async function directly in the page
const BlogDetailsPage = async ({ params }: { params: { blogsId: string } }) => {
  const { blogsId } = params;

  if (!blogsId) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error: Blog ID is missing
      </div>
    );
  }

  // Fetch the blog details
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Failed to fetch blog
      </div>
    );
  }

  const blogResponse = await res.json();
  const blog: Blog = blogResponse.data;

  if (!blog) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        No blog data available.
      </div>
    );
  }

  return <BlogDetails blog={blog} />;
};

export default BlogDetailsPage;
