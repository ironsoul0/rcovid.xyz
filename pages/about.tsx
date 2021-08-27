import React from "react";

const AboutPage = () => {
  return (
    <div className="mb-40">
      <p className="mt-8 mb-4 text-2xl font-bold text-white-900">
        What's going on?
      </p>
      <p className="mt-4 text-lg text-white-700">
        This website is an example of how people can donate crypto assets to
        charities without actually spending them.
      </p>
      <p className="mt-4 text-lg text-white-700">
        We use the rDAI protocol, allowing people to earn interest on their DAI
        and redirect it to charity organisations.
      </p>
      <p className="mt-4 text-lg text-white-700">
        rDAI uses Compound to allow users to earn interest on DAI, but instead
        of redeeming the interest and principal back into the user’s wallet as
        one might do with a traditional bank savings account, it separates the
        principal from the interest. The principal is always under the original
        user’s control, but the interest is directed to flow wherever the rDAI
        instructions specify.
      </p>
      <p className="mt-8 mb-4 text-2xl font-bold text-white-900">
        I want to create something similar!
      </p>
      <p className="mt-4 text-lg text-white-700">
        The code is fully{" "}
        <a
          href="https://github.com/ironsoul0/rcovid.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          open-source
        </a>{" "}
        and was intended to be forked by other people. So please go through the
        README in the repo to set up your website with possibly custom design.
      </p>
    </div>
  );
};

export default AboutPage;
