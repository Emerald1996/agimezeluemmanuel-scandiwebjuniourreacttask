import { gql } from "@apollo/client"

export const SINGLE_PRODUCTS = gql`
  query getSingleItemsById($id: String!) {
    product(id: $id) {
      id
      name
      category
      inStock
      brand
      description
      gallery
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
`;
