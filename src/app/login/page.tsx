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

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // try {
    //   const res = await loginUser(data);
    //   if (res.success) {
    //     alert(res.message);
    //     localStorage.setItem("accessToken", res.accessToken);
    //     router.push("/");
    //   }
    // } catch (err: any) {
    //   console.error(err?.message);
    //   throw new Error(err?.message);
    // }
    // signIn("credentials", {
    //   email: data?.email,
    //   password: data?.password,
    //   redirect: true,
    //   callbackUrl: "http://localhost:3000/dashboard",
    // });
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
              variant="outline"
              className="flex items-center gap-3 justify-center w-full border-gray-500"
            >
              <FaGoogle size={20} /> {/* ✅ Corrected */}
              Sign in with Google
            </Button>

            <Button
              onClick={() =>
                signIn("github", {
                  callbackUrl: "http://localhost:3000/dashboard",
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
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default LoginPage;
