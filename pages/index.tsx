import { gql } from "@apollo/client";
import client from "apollo-client";
import { Donate, Hero, History } from "components";
import type { Transfer } from "config";
import React from "react";

type Props = {
  readonly transfers: readonly Transfer[];
};

const IndexPage = (props: Props) => {
  return (
    <div>
      <Hero />
      <Donate />
      <History {...props} />
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Transfers {
        transfers(orderBy: id, orderDirection: desc, first: 50) {
          id
          value
          transaction {
            id
          }
          from {
            id
          }
          to {
            id
            hat {
              id
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      transfers: data.transfers,
    },
  };
}

export default IndexPage;
