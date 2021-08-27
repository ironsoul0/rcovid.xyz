import { useEthers } from "@usedapp/core";
import { readOnlyUrls, TARGET_CHAIN } from "config";
import { DAI, DAIContract, rDAI, RDAIContract } from "contracts";
import { Contract, providers } from "ethers";
import { useMemo } from "react";

export const chainReadProvider = new providers.StaticJsonRpcProvider(
  readOnlyUrls[TARGET_CHAIN]
);

export const useRDAIContract = () => {
  const { library } = useEthers();

  return useMemo(
    () =>
      new Contract(
        rDAI.address,
        rDAI.abi,
        library ? library.getSigner() : chainReadProvider
      ) as RDAIContract,
    [library]
  );
};

export const useDAIContract = () => {
  const { library } = useEthers();

  return useMemo(
    () =>
      new Contract(
        DAI.address,
        DAI.abi,
        library ? library.getSigner() : chainReadProvider
      ) as DAIContract,
    [library]
  );
};
