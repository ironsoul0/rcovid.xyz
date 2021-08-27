import { useEthers } from "@usedapp/core";
import clsx from "clsx";
import { LogoIcon } from "components";
import { TARGET_CHAIN } from "config";
import Link from "next/link";
import { FC, useCallback, useMemo } from "react";

import { Props } from "./props";

export const NavBar: FC<Props> = ({ className }: Props) => {
  const { activateBrowserWallet, chainId, account } = useEthers();

  const handleConnectClick = useCallback(() => {
    if (!account) {
      activateBrowserWallet();
    }
  }, [activateBrowserWallet, account]);

  const strippedAccountAddress = useMemo(() => {
    return account?.substr(0, 9) + "...";
  }, [account]);

  const invalidChainId = useMemo(() => {
    return account && chainId !== TARGET_CHAIN;
  }, [chainId, account]);

  return (
    <div
      className={clsx(
        "flex items-center justify-between mt-8 mb-40",
        className
      )}
    >
      <Link href="/about">
        <a>
          <LogoIcon className="w-10 mb-2 fill-current text-white-900" />
        </a>
      </Link>
      <div className="flex items-center">
        <Link href="/about">
          <a className="text-white-900">How this works?</a>
        </Link>
        <button
          className={clsx(
            "px-4 py-3 ml-6 bg-white-300 text-white-900 rounded-md hover:opacity-90 transition-opacity",
            invalidChainId && "bg-red-500"
          )}
          onClick={handleConnectClick}
        >
          {account
            ? invalidChainId
              ? "Invalid chain"
              : strippedAccountAddress
            : "Connect account"}
        </button>
      </div>
    </div>
  );
};
