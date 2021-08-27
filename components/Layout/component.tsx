import { Footer } from "components";
import { NavBar } from "components/NavBar";
import React, { FC } from "react";

import { Props } from "./props";

export const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div className="min-h-screen px-4 mx-auto font-sans max-w-screen-md transition-colors bg-darkTheme">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};
