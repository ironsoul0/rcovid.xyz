import { ChainId } from "@usedapp/core";
import { TARGET_CHAIN } from "config";

import abi from "./rDAI.abi.json";

export type { RDAIContract } from "./rDAI";

const addresses = {
  [ChainId.Mainnet]: "0x261b45D85cCFeAbb11F022eBa346ee8D1cd488c0",
  [ChainId.Hardhat]: "0x261b45D85cCFeAbb11F022eBa346ee8D1cd488c0",
  [ChainId.Kovan]: "0x462303f77a3f17Dbd95eb7bab412FE4937F9B9CB",
};

export const rDAI = {
  abi,
  address: addresses[TARGET_CHAIN],
};
