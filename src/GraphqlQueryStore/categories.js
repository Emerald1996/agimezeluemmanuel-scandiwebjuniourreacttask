import { gql } from "@apollo/client";

const FETCH_CATEGORIES = gql`
  query FetchCategories{
    categories {
      name
    }
  }
`;

export default FETCH_CATEGORIES;
