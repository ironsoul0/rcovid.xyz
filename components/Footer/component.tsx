import React, { FC } from "react";

export const Footer: FC = () => {
  return (
    <p className="py-8 text-sm font-light text-center text-white-500">
      <a
        href="https://github.com/ironsoul0/rcovid.xyz"
        target="_blank"
        className="hover:opacity-80 transition-opacity"
        rel="noreferrer"
      >
        Designed & Crafted by Timka © 2021
      </a>
    </p>
  );
};
