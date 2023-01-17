import { gql } from "@apollo/client";

export const FETCH_CURRENCIES = gql`
  query FetchCurrencies{
    currencies {
      symbol
      label
    }
  }
`;
