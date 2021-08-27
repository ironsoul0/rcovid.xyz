import {
  useContractFunction,
  useEtherBalance,
  useEthers,
  useNotifications,
} from "@usedapp/core";
import { readOnlyUrls, TARGET_CHAIN } from "config";
import { DAI, DAIContract, rDAI, RDAIContract } from "contracts";
import { BigNumber, Contract, providers, utils } from "ethers";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const accountToImpersonate = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";

const chainReadProvider = new providers.StaticJsonRpcProvider(
  readOnlyUrls[TARGET_CHAIN]
);

const useRDAIContract = () => {
  const { library } = useEthers();

  console.log("library", library?.getSigner());

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

const useDAIContract = () => {
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

const DemoPage = () => {
  const [hatId, setHatId] = useState(BigNumber.from(0));
  const { deactivate, activateBrowserWallet, account, chainId } = useEthers();
  const rDAIContract = useRDAIContract();
  const DAIContract = useDAIContract();
  const balance = useEtherBalance(account);
  const { state, send, events } = useContractFunction(
    rDAIContract as any,
    "createHat",
    {
      transactionName: "createHat",
    }
  );

  const { notifications } = useNotifications();

  useEffect(() => {
    console.log("notifications", notifications);
  }, [notifications]);

  const createHat = useCallback(async () => {
    if (account) {
      const createHat = await rDAIContract.createHat(
        [recipient],
        [BigNumber.from(100)],
        false
      );
      const result = await createHat.wait();
      console.log("result", result);
      const createdHatID = result.events?.[0]?.args?.hatID as BigNumber;
      setHatId(createdHatID);
      console.log("createdHatId", createdHatID);
      const hatIDInfo = await rDAIContract.getHatByID(createdHatID);
      console.log("Newly minted hat id info", hatIDInfo);
    }
  }, [rDAIContract, account]);

  const createHatNew = useCallback(async () => {
    send([recipient], [BigNumber.from(100)], false);
  }, [send]);

  // useEffect(() => {
  //   console.log("Target chain", TARGET_CHAIN);
  //   console.log("Infura url", readOnlyUrls[TARGET_CHAIN]);
  //   console.log(rDAIContract);

  //   const queryHats = async () => {
  //     const hatID = await rDAIContract.getHatByID(hatId);
  //     console.log(hatID);
  //     console.log(hatID.proportions[0]);
  //   };

  //   // queryHats();
  // }, [rDAIContract]);

  useEffect(() => {
    console.log("new state", state, events, hatId);
  }, [state, events, hatId]);

  const sendFunds = useCallback(() => {
    if (account) {
      const signer = chainReadProvider.getSigner();
      signer.sendTransaction({ to: account, value: utils.parseEther("5") });
    }
  }, [account]);

  const mintRDai = useCallback(async () => {
    const mintedOperation = await rDAIContract.mintWithSelectedHat(
      utils.parseEther("5"),
      hatId
    );
    await mintedOperation.wait();
  }, [rDAIContract, hatId]);

  const getApproval = async () => {
    if (account) {
      // const approval = await DAIContract.allowance(account, rDAI.address, {
      //   blockTag: 12965000,
      // });
      const approval = await DAIContract.allowance(account, rDAI.address);
      console.log("Approval for my address", utils.formatEther(approval));
    }
  };

  const snatchDai = async () => {
    if (!account) return;
    await chainReadProvider.send("hardhat_impersonateAccount", [
      accountToImpersonate,
    ]);
    const signer = await chainReadProvider.getSigner(accountToImpersonate);
    const daiContract = new Contract(
      DAI.address,
      DAI.abi,
      signer
    ) as DAIContract;
    console.log("transferring..");
    await daiContract.transfer(account, utils.parseEther("100"));
  };

  const approveDai = async () => {
    await DAIContract.approve(rDAI.address, utils.parseEther("50"));
  };

  const getRDAIInterest = async () => {
    const interest = await rDAIContract.interestPayableOf(recipient);
    console.log("interest payable of", utils.formatEther(interest));
  };

  return (
    <div className="max-w-lg py-4 mx-auto text-center">
      <p>Connected account: {account}</p>
      <p>Chain ID: {chainId}</p>
      <p>Balance: {balance?.toString()}</p>
      <button onClick={() => activateBrowserWallet()} className="bg-green-500">
        Connect to a wallet
      </button>
      <br />
      <button onClick={createHat} className="bg-green-700">
        Create hat
      </button>
      <br />
      <button onClick={createHatNew} className="bg-green-700">
        Create hat with usedapp
      </button>
      <br />
      <button onClick={() => deactivate()}>Deactivate</button>
      <button onClick={sendFunds}>Send funds</button>
      <br />
      <br />
      <button onClick={mintRDai}>Mint rDAI</button>
      <br />
      <br />
      <button onClick={getApproval}>Get Approval</button>
      <br />
      <br />
      <button onClick={snatchDai}>SnatchDAI</button>
      <br />
      <br />
      <button onClick={approveDai}>Approve DAI</button>
      <br />
      <br />
      <button onClick={getRDAIInterest}>Get RDAI interest</button>
      <br />
      <br />
      <p>Minted hat id: {hatId.toString()}</p>
    </div>
  );
};

export default DemoPage;
