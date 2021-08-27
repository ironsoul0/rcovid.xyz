import { providers } from "ethers";

import { readOnlyUrls, TARGET_CHAIN } from "../config";

export const useChainReadProvider = () =>
  new providers.StaticJsonRpcProvider(readOnlyUrls[TARGET_CHAIN]);
