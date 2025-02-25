import BlogDetails from "@/components/shared/Blogs/BlogDetails";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`);
  const blogData = await res.json();

  const blog = blogData.data;

  console.log(blogData);
  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
