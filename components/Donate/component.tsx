import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import React, { FC, useMemo, useState } from "react";

import { useAllowance } from "./useAllowance";
import { useStake } from "./useStake";

export const Donate: FC = () => {
  const { account } = useEthers();
  const [donationValue, setDonationValue] = useState<string>("");
  const donationShots = useMemo(() => {
    if (!donationValue) {
      return donationValue;
    }

    return Math.floor(parseInt(donationValue) / 8) + 1;
  }, [donationValue]);

  const {
    loading: allowanceLoading,
    allowed,
    approveDai,
    approveDaiState,
  } = useAllowance(donationValue);

  const {
    sendMintRdai,
    mintRdaiState,
    rdaiBalance,
    daiBalance,
    sendRedeem,
    redeemState,
  } = useStake(donationValue);

  const insufficientFunds = useMemo(() => {
    return donationValue && utils.parseEther(donationValue).gt(daiBalance);
  }, [donationValue, daiBalance]);

  return (
    <div className="mt-20">
      <div>
        <p className="text-2xl font-bold text-white-900">
          How much DAI you want to stake?
        </p>
        <p className="text-xl text-white-700">
          Balance is {utils.formatEther(daiBalance).substr(0, 7)} DAI
        </p>
        <div className="relative mt-4">
          <div
            className="absolute right-0 h-full pr-5 text-white-700"
            style={{ marginTop: "14px" }}
          >
            {donationShots ? `${donationShots} vaccines / month` : ""}
          </div>
          <input
            value={donationValue}
            onChange={(e) => setDonationValue(e.target.value)}
            type="number"
            placeholder="1000 DAI"
            className="w-full px-5 py-4 font-light leading-tight outline-none appearance-none rounded-md bg-white-300 text-white-700 focus:outline-none ring-blue-500 focus:ring-2"
          />
          <div className="flex items-center mt-3">
            <p className="text-white-500">Suggested: </p>
            <button
              className="ml-6 text-white-900"
              onClick={() => setDonationValue("10")}
            >
              10 DAI ~ 2 vaccines
            </button>
            <button
              className="ml-6 text-white-900"
              onClick={() => setDonationValue("30")}
            >
              30 DAI ~ 4 vaccines
            </button>
          </div>
        </div>
        {account &&
          !allowed &&
          !allowanceLoading &&
          donationValue &&
          !insufficientFunds && (
            <button
              disabled={approveDaiState.status === "Mining"}
              className="w-full py-3 mt-4 text-xl font-bold bg-purple-500 text-white-900 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={approveDai}
            >
              {approveDaiState.status === "Mining" ? (
                <div
                  className="w-6 h-6 m-auto border-2 border-t-2 border-gray-200 rounded-full animate-spin ease-linear"
                  style={{ borderTopColor: "#8E8E8E" }}
                />
              ) : (
                "Allow DAI"
              )}
            </button>
          )}
        <button
          className="w-full py-3 mt-4 text-xl font-bold bg-blue-600 text-white-900 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={
            !donationValue ||
            !account ||
            allowanceLoading ||
            !allowed ||
            insufficientFunds ||
            mintRdaiState.status === "Mining"
          }
          onClick={sendMintRdai}
        >
          {mintRdaiState.status === "Mining" ? (
            <div
              className="w-6 h-6 m-auto border-2 border-t-2 border-gray-200 rounded-full animate-spin ease-linear"
              style={{ borderTopColor: "#8E8E8E" }}
            />
          ) : !account ? (
            "Please connect account first"
          ) : insufficientFunds ? (
            "Insufficient funds"
          ) : (
            "Stake"
          )}
        </button>
      </div>
      {account && (
        <div>
          <p className="mt-20 text-2xl font-bold text-white-900">
            Control your stake
          </p>
          <p className="mb-3 text-xl text-white-700">
            Stake balance: {utils.formatEther(rdaiBalance).substr(0, 7)} rDAI{" "}
          </p>
          <button
            disabled={redeemState.status === "Mining" || rdaiBalance.eq(0)}
            className="w-full py-3 text-xl font-bold bg-indigo-500 text-white-900 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={sendRedeem}
          >
            {redeemState.status === "Mining" ? (
              <div
                className="w-6 h-6 m-auto border-2 border-t-2 border-gray-200 rounded-full animate-spin ease-linear"
                style={{ borderTopColor: "#8E8E8E" }}
              />
            ) : (
              "Stop donating and withdraw"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
