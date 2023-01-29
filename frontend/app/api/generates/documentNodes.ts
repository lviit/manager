import gql from 'graphql-tag';
export const ProductCard = gql`
    fragment ProductCard on ProductEntity {
  id
  attributes {
    Name
    Price
    image {
      data {
        attributes {
          url
        }
      }
    }
    Brand
    Website
  }
}
    `;
export const Categories = gql`
    query categories {
  categories {
    data {
      id
      attributes {
        Name
        products {
          data {
            ...ProductCard
          }
        }
      }
    }
  }
}
    ${ProductCard}`;
export const Category = gql`
    query category($id: ID) {
  category(id: $id) {
    data {
      id
      attributes {
        Name
        products {
          data {
            ...ProductCard
          }
        }
      }
    }
  }
}
    ${ProductCard}`;
export const Products = gql`
    query products {
  products {
    __typename
    data {
      ...ProductCard
    }
  }
}
    ${ProductCard}`;