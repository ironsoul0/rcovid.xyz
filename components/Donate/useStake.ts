import { useContractFunction, useEthers } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { useDAIContract, useRDAIContract } from "hooks";
import { useCallback, useEffect, useState } from "react";

const HAT_ID = process.env.NEXT_PUBLIC_HAT_ID;

export const useStake = (daiAmount: string | undefined) => {
  const { account } = useEthers();
  const rdaiContract = useRDAIContract();
  const daiContract = useDAIContract();
  const {
    send,
    state: mintRdaiState,
    events: mintRdaiEvents,
  } = useContractFunction(rdaiContract as any, "mintWithSelectedHat", {
    transactionName: "mintWithSelectedHat",
  });
  const {
    send: sendRedeemAll,
    state: redeemState,
    events: redeemEvents,
  } = useContractFunction(rdaiContract as any, "redeemAll", {
    transactionName: "redeemAll",
  });
  const [rdaiBalance, setRdaiBalance] = useState<BigNumber>(BigNumber.from(0));
  const [daiBalance, setDaiBalance] = useState<BigNumber>(BigNumber.from(0));

  const sendMintRdai = useCallback(() => {
    if (!daiAmount) return;
    send(utils.parseEther(daiAmount), BigNumber.from(HAT_ID));
  }, [send, daiAmount]);

  const sendRedeem = useCallback(() => {
    sendRedeemAll();
  }, [sendRedeemAll]);

  const fetchBalance = useCallback(async () => {
    if (!account) return;
    const rdaiBalance = await rdaiContract.balanceOf(account);
    const daiBalance = await daiContract.balanceOf(account);
    setRdaiBalance(rdaiBalance);
    setDaiBalance(daiBalance);
  }, [account, rdaiContract, daiContract]);

  useEffect(() => {
    if (mintRdaiEvents || redeemEvents) {
      fetchBalance();
    }
  }, [mintRdaiEvents, fetchBalance, redeemEvents]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance, account]);

  return {
    sendMintRdai,
    mintRdaiState,
    fetchBalance,
    rdaiBalance,
    daiBalance,
    sendRedeem,
    redeemState,
  };
};
