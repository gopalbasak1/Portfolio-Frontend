import Header from "@/components/shared/Header";
import StairTransition from "@/components/shared/StairTransition";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <StairTransition />
      {children}
    </div>
  );
};

export default CommonLayout;
