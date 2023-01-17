import { gql } from "@apollo/client";

const FETCH_PRODUCTS = gql`
  query GetProducts($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        brand
        attributes {
          id
          name
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`;


export default FETCH_PRODUCTS;