/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa6"; // ✅ Corrected imports
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import loginUser from "@/utils/actions/loginUser";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  // console.log("Frontend URL:", process.env.NEXT_PUBLIC_FRONTEND_URL);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // try {
    //   const res = await loginUser(data);
    //   console.log(res);
    //   if (res.data.accessToken) {
    //     toast.success(res.message);
    //     localStorage.setItem("accessToken", res.data.accessToken);

    //     router.push("/");
    //   }
    // } catch (err: any) {
    //   console.error(err?.message);
    //   toast.error(err?.message);
    //   throw new Error(err?.message);
    // }
    const res = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
      // callbackUrl: `http://localhost:3000/dashboard`,
    });
    if (res?.error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Login successful!");
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto flex justify-center">
        <div className="w-full max-w-md p-10 bg-[#27272c] rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6">
            Login to Your Account
          </h3>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              className="rounded-xl"
              type="email"
              id="email"
              {...register("email")}
              placeholder="Email"
            />
            <Input
              className="rounded-xl"
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
            />

            <Button
              type="submit"
              size="md"
              className="w-full py-2 hover:text-white/65"
            >
              Login
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
              onClick={() =>
                signIn("google", {
                  callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
                })
              }
              variant="outline"
              className="flex items-center gap-3 justify-center w-full border-gray-500"
            >
              <FaGoogle size={20} /> {/* ✅ Corrected */}
              Sign in with Google
            </Button>

            <Button
              onClick={() =>
                signIn("github", {
                  callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
                })
              }
              variant="outline"
              className="flex items-center gap-3 justify-center w-full border-gray-500"
            >
              <FaGithub size={20} /> {/* ✅ Corrected */}
              Sign in with GitHub
            </Button>
          </div>

          {/* Signup Link */}
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#14db99] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default LoginPage;
