import { gql, GraphQLClient } from "graphql-request";

const endpoint = `https://programs.shyft.to/v0/graphql/?api_key=<YOUR_SHYFT_API_KEY>`;

const graphQLClient = new GraphQLClient(endpoint, {
  method: `POST`,
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

function start() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("No command-line arguments provided.");
    return;
  }
  console.log("Command-line arguments:", args[0]);

  switch (args[0]) {
    case "all":
      queryAll();
      break;
    case "filter":
      queryAndFilter();
      break;
    case "sort":
      sortAndOrder();
      break;
    case "pagination":
      pagination();
      break;
    default: {
      console.log("Invalid arg");
      break;
    }
  }
}

function queryAll() {
  // Get all proposalsV2 accounts
  const query = gql`
    query GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2 {
      GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2 {
        name
        pubkey
      }
    }
  `;

  // @ts-ignore
  graphQLClient.request(query).then(console.log);
}

function queryAndFilter() {
  // Get all ProposalsV2 where name is like Orca
  const query = gql`
    query GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(
      $where: GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2_bool_exp
    ) {
      GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(where: $where) {
        name
        pubkey
      }
    }
  `;

  const variables = {
    where: {
      name: {
        _regex: "orca",
      },
    },
  };

  // @ts-ignore
  graphQLClient.request(query, variables).then(console.log);
}

function sortAndOrder() {
  // ProposalsV2 where governing mint is Grape token sorted by drafting date
  const query = gql`
    query GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(
      $where: GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2_bool_exp
      $orderBy: [GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2_order_by!]
    ) {
      GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(
        where: $where
        order_by: $orderBy
      ) {
        name
        pubkey
        draftAt
        governingTokenMint
      }
    }
  `;

  const variables = {
    where: {
      governingTokenMint: {
        _eq: "8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA",
      },
    },
    orderBy: [
      {
        draftAt: "desc",
      },
    ],
  };

  // @ts-ignore
  graphQLClient.request(query, variables).then(console.log);
}

function pagination() {
  //  Get the first 10 proposalsV2 accounts
  const query = gql`
    query GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(
      $limit: Int
      $offset: Int
    ) {
      GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw_ProposalV2(
        limit: $limit
        offset: $offset
      ) {
        name
        pubkey
      }
    }
  `;

  const variables = {
    limit: 10,
    offset: 0,
  };

  // @ts-ignore
  graphQLClient.request(query, variables).then(console.log);
}

start();
