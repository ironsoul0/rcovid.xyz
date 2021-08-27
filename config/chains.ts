import { ChainId } from "@usedapp/core";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

type ValidChainID = ChainId.Mainnet | ChainId.Kovan | ChainId.Hardhat;

type ChainIDUrl = {
  [T in ValidChainID]: string;
};

export const readOnlyUrls: ChainIDUrl = {
  [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  [ChainId.Kovan]: `https://kovan.infura.io/v3/${INFURA_ID}`,
  [ChainId.Hardhat]: `http://localhost:8545`,
};

export const blockExplorers: ChainIDUrl = {
  [ChainId.Mainnet]: `https://etherscan.io`,
  [ChainId.Kovan]: `https://kovan.etherscan.io`,
  [ChainId.Hardhat]: `https://localhost:8545`,
};

export const TARGET_CHAIN = parseInt(
  process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string
) as ValidChainID;
