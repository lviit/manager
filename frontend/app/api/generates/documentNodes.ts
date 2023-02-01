import gql from 'graphql-tag';
export const ProductCard = gql`
    fragment ProductCard on ProductEntity {
  id
  attributes {
    Name
    Slug
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
}
    `;
export const CategoryCard = gql`
    fragment CategoryCard on CategoryEntity {
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
    ${ProductCard}`;
export const ProductDetails = gql`
    fragment ProductDetails on ProductEntity {
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
    categories {
      data {
        attributes {
          Name
          Slug
        }
      }
    }
  }
}
    `;
export const Categories = gql`
    query categories($filters: CategoryFiltersInput) {
  categories(filters: $filters) {
    data {
      ...CategoryCard
    }
  }
}
    ${CategoryCard}`;
export const Product = gql`
    query product($filters: ProductFiltersInput) {
  products(filters: $filters) {
    data {
      ...ProductDetails
    }
  }
}
    ${ProductDetails}`;