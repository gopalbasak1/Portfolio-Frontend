"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { registerUser } from "@/utils/actions/registerUser";

export type UserData = {
  name?: string | null;
  email?: string | null;
  password?: string;
  image?: FileList | null;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Upload Image to Cloudinary
  const uploadImageToCloudinary = async (
    file: File
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (data: UserData) => {
    try {
      setLoading(true);
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        imageUrl = await uploadImageToCloudinary(file);
      }

      const formattedData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl || "",
      };

      const res = await registerUser(formattedData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const res = await signIn(provider, {
        redirect: false, // Prevents automatic redirection
        callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
      });

      if (res?.error) {
        toast.error(`Failed to sign in with ${provider}. Please try again.`);
      } else {
        toast.success(`Signed in with ${provider} successfully!`);
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`);
      }
    } catch (error) {
      console.error("Social login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto flex justify-center">
        <div className="w-full max-w-md p-10 bg-[#27272c] rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6">
            Register to Your Account
          </h3>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              className="rounded-xl"
              type="text"
              id="name"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            <Input
              className="rounded-xl"
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <Input
              className="rounded-xl"
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <Input
              className="rounded-xl py-2 text-[#9ca49e]"
              type="file"
              accept="image/*"
              id="image"
              {...register("image")}
            />

            <Button
              type="submit"
              size="md"
              className="w-full py-2 hover:text-white/65"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-500" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-500" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handleSocialLogin("google")}
              variant="outline"
              className="flex items-center gap-3 justify-center w-full border-gray-500"
            >
              <FaGoogle size={20} />
              Sign in with Google
            </Button>

            <Button
              onClick={() => handleSocialLogin("github")}
              variant="outline"
              className="flex items-center gap-3 justify-center w-full border-gray-500"
            >
              <FaGithub size={20} />
              Sign in with GitHub
            </Button>
          </div>

          {/* Signup Link */}
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#14db99] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default RegisterPage;
