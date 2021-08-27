import { utils } from "ethers";
import { useRDAIContract } from "hooks";
import React, { FC, useEffect, useState } from "react";

export const Hero: FC = () => {
  const rdaiContract = useRDAIContract();
  const [interest, setInterest] = useState("0.0");

  useEffect(() => {
    const fetchInterest = async () => {
      const interest = await rdaiContract.interestPayableOf(
        process.env.NEXT_PUBLIC_RECIPIENT_ID || ""
      );
      setInterest(utils.formatEther(interest));
    };

    fetchInterest();
  }, [rdaiContract]);

  return (
    <div>
      <h1 className="text-4xl font-bold md:mt-8 md:mb-2 md:text-5xl text-white-900">
        Save the world from COVID-19
      </h1>
      <div>
        <p className="mb-1 text-3xl text-white-700">
          Deposit crypto and save people's lifes
        </p>
        <p className="mb-2 text-3xl text-white-500">
          <span className="text-blue-600">{interest.substr(0, 10)}</span> DAI
          generated already
        </p>
      </div>
    </div>
  );
};
