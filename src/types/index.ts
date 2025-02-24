import { DefaultSession } from "next-auth";
export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
  user?: { name?: string; image?: string };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    accessToken: string;
  }
}
export interface Project {
  _id: string;
  title: string;
  description: string; // Ensure it's always a string (remove `| undefined`)
  liveLink: string;
  github: string;
  category: string;
  stack: { name: string }[];
  image: string;
  user?: { name?: string; image?: string };
  createdAt: string;
}
