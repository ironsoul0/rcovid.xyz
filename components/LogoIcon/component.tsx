import React, { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLOrSVGElement>;

export const LogoIcon: FC<Props> = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 55 55"
    >
      <path
        fill="#C9C9CB"
        d="M19.938 10.77c2.062-.916 4.125-1.374 6.416-1.603v5.729c0 .687.459 1.146 1.146 1.146.688 0 1.146-.459 1.146-1.146v-5.73c4.125.23 8.02 1.834 11 4.584l-.688.688c-.229.229-.229.458-.229.916 0 .688.459 1.146 1.146 1.146.23 0 .688-.23.917-.23l.458-.916c2.52 2.98 4.354 6.875 4.583 11h-5.729c-.687 0-1.146.459-1.146 1.146 0 .688.459 1.146 1.146 1.146h5.73c-.23 2.291-.688 4.354-1.605 6.416-.229.688 0 1.146.459 1.605h.458c.458 0 .916-.23 1.146-.688 1.145-2.291 1.604-4.812 1.833-7.333h3.438c.687 0 1.145-.459 1.145-1.146 0-.688-.458-1.146-1.145-1.146h-3.438c-.23-4.812-2.292-9.166-5.27-12.604l2.29-2.292a1.108 1.108 0 000-1.604 1.108 1.108 0 00-1.603 0l-2.292 2.292c-3.438-2.98-7.792-5.042-12.604-5.271V3.437c0-.687-.459-1.145-1.146-1.145-.688 0-1.146.458-1.146 1.145v3.438c-2.52.23-5.041.687-7.333 1.833-.688.23-.917.917-.688 1.604.459.459 1.146.688 1.605.459zm.687 20.167c-1.833 0-3.438 1.605-3.438 3.438 0 1.833 1.605 3.438 3.438 3.438 1.833 0 3.438-1.605 3.438-3.438 0-1.833-1.605-3.438-3.438-3.438zm0 4.584c-.688 0-1.146-.459-1.146-1.146 0-.688.459-1.146 1.146-1.146.688 0 1.146.459 1.146 1.146 0 .688-.459 1.146-1.146 1.146zm-16.27-33c-.46-.23-1.376-.23-1.605 0-.458.458-.458 1.375-.23 1.833l9.626 9.396c-3.209 3.438-5.042 8.02-5.271 12.604H3.437c-.687 0-1.145.459-1.145 1.146 0 .688.458 1.146 1.145 1.146h3.438c.23 4.812 2.292 9.166 5.27 12.604l-2.29 2.292c-.23.229-.23.458-.23.916 0 .688.458 1.146 1.146 1.146.229 0 .687-.229.916-.229l2.292-2.292c3.438 2.98 7.792 5.042 12.604 5.271v3.438c0 .687.459 1.145 1.146 1.145.688 0 1.146-.458 1.146-1.145v-3.667c4.583-.23 9.167-2.063 12.604-5.27l9.625 9.624c.23.23.459.23.917.23.229 0 .687-.23.916-.23a1.108 1.108 0 000-1.604L4.355 2.521zm16.27 19.708l3.208 3.209c-.458.687-1.145 1.145-1.833 1.145-1.375 0-2.292-.916-2.292-2.291-.229-.917.23-1.834.917-2.063zm8.02 23.604v-8.02c0-.688-.457-1.146-1.145-1.146s-1.146.458-1.146 1.145v8.021c-3.896-.229-7.791-1.833-11-4.583l.688-.688a1.108 1.108 0 000-1.604 1.108 1.108 0 00-1.605 0l-.687.688c-2.75-3.209-4.354-7.104-4.583-11h5.729c.687 0 1.146-.459 1.146-1.146 0-.688-.459-1.146-1.146-1.146h-5.73c.23-3.896 1.834-7.791 4.584-11l5.27 5.271c-1.145.917-1.832 2.063-1.832 3.438a4.597 4.597 0 004.583 4.583c1.375 0 2.75-.688 3.437-1.834l14.209 14.209c-2.98 2.979-6.875 4.583-10.771 4.812zm2.293-25.208c0 1.833 1.604 3.438 3.437 3.438 1.833 0 3.438-1.605 3.438-3.438 0-1.833-1.605-3.438-3.438-3.438-1.833 0-3.438 1.605-3.438 3.438zm4.583 0c0 .688-.459 1.146-1.146 1.146-.688 0-1.146-.459-1.146-1.146 0-.688.459-1.146 1.146-1.146.688 0 1.146.459 1.146 1.146z"
      ></path>
    </svg>
  );
};
