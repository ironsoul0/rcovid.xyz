import { ChainId } from "@usedapp/core";
import { TARGET_CHAIN } from "config";

import abi from "./DAI.abi.json";

export type { DAIContract } from "./DAI";

const addresses = {
  [ChainId.Mainnet]: "0x6b175474e89094c44da98b954eedeac495271d0f",
  [ChainId.Hardhat]: "0x6b175474e89094c44da98b954eedeac495271d0f",
  [ChainId.Kovan]: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
};

export const DAI = {
  abi,
  address: addresses[TARGET_CHAIN],
};
