import { blockExplorers, TARGET_CHAIN, Transfer } from "config";
import React, { FC, useMemo } from "react";

type Props = {
  readonly transfers: readonly Transfer[];
};

export const History: FC<Props> = ({ transfers }: Props) => {
  const ourTransfers = useMemo(() => {
    return transfers.filter(
      (transfer) => transfer.to.hat?.id === process.env.NEXT_PUBLIC_HAT_ID
    );
  }, [transfers]);

  return (
    <div className="mb-10">
      <p className="mt-20 mb-4 text-2xl font-bold text-white-900">
        Staking history
      </p>
      {!ourTransfers.length && (
        <p className="text-white-700">History is empty..</p>
      )}
      {ourTransfers.slice(0, 5).map((transfer, i) => (
        <div key={i}>
          <a
            className="text-white-700"
            target="_blank"
            href={`${blockExplorers[TARGET_CHAIN]}/tx/${transfer.transaction.id}`}
            rel="noreferrer"
          >
            {transfer.to.id.substr(0, 20)}... - {transfer.value.substr(0, 6)}{" "}
            DAI
          </a>
        </div>
      ))}
    </div>
  );
};
