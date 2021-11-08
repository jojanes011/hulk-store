import { gql } from 'apollo-boost';

export const CREATE_PRODUCT = gql`
  mutation createProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $where: ProductWhereUniqueInput!
    $data: ProductUpdateInput!
  ) {
    updateProduct(where: $where, data: $data) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      name
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation createPayment($data: PaymentCreateInput!) {
    createPayment(data: $data) {
      id
    }
  }
`;
