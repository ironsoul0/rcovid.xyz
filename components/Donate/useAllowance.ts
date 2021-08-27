import { useContractFunction, useEthers } from "@usedapp/core";
import { rDAI } from "contracts";
import { BigNumber, utils } from "ethers";
import { useDAIContract } from "hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useAllowance = (daiAmount: string | undefined) => {
  const { account } = useEthers();
  const [loading, setLoading] = useState(false);
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const daiContract = useDAIContract();
  const {
    send: sendApproveDai,
    state: approveDaiState,
    events: approveDaiEvents,
  } = useContractFunction(daiContract as any, "approve", {
    transactionName: "daiApprove",
  });

  const fetchAllowance = useCallback(async () => {
    if (!account) return;
    setLoading(true);
    const allowance = await daiContract.allowance(account, rDAI.address);
    setAllowance(allowance);
    setLoading(false);
  }, [daiContract, account]);

  const allowed = useMemo(
    () => utils.parseEther(daiAmount || "0").lte(allowance),
    [daiAmount, allowance]
  );

  const approveDai = useCallback(() => {
    if (daiAmount) {
      sendApproveDai(rDAI.address, utils.parseEther(daiAmount));
    }
  }, [daiAmount, sendApproveDai]);

  useEffect(() => {
    fetchAllowance();
  }, [fetchAllowance]);

  useEffect(() => {
    if (approveDaiEvents) {
      fetchAllowance();
    }
  }, [approveDaiEvents, fetchAllowance]);

  return {
    loading,
    allowed,
    approveDai,
    approveDaiState,
  };
};
