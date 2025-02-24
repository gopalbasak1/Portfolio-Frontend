import LatestBlogs from "@/components/shared/Blogs/LatestBlogs";

const Blogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
  const blogData = await res.json();
  const blogs = blogData?.data;
  return (
    <div className="my-10 container mx-auto">
      <LatestBlogs blogs={blogs} />
    </div>
  );
};

export default Blogs;
