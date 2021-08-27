import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ChainId } from "@usedapp/core";
import { TARGET_CHAIN } from "config";

const graphUrls = {
  [ChainId.Mainnet]:
    "https://api.thegraph.com/subgraphs/name/rtoken-project/rdai",
  [ChainId.Hardhat]:
    "https://api.thegraph.com/subgraphs/name/rtoken-project/rdai",
  [ChainId.Kovan]:
    "https://api.thegraph.com/subgraphs/name/rtoken-project/rdai-kovan",
};

const client = new ApolloClient({
  uri: graphUrls[TARGET_CHAIN],
  cache: new InMemoryCache(),
});

export default client;
