import gql from 'graphql-tag';
export const ProductCard = gql`
    fragment ProductCard on ProductEntity {
  id
  attributes {
    Name
    Slug
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
    query categories($filters: CategoryFiltersInput) {
  categories(filters: $filters) {
    data {
      id
      attributes {
        Name
        Slug
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
    query products($filters: ProductFiltersInput) {
  products(filters: $filters) {
    data {
      id
      attributes {
        Name
        Price
        Brand
        Website
      }
    }
  }
}
    `;