import {
  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_ERROR,
  GET_ONE_PRODUCT_SUCCESS,
  GET_PART_OF_PRODUCTS,
  GET_PART_OF_PRODUCTS_ERROR,
  GET_PART_OF_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SEARCH_PRODUCTS,
  GET_SEARCH_PRODUCTS_ERROR,
  GET_SEARCH_PRODUCTS_SUCCESS,
} from "../actions/types";

const initialState = {
  products: [],
  productsOver: false,

  loading: false,
  error: null,

  oneProduct: {},

  searchProducts: [],
  searchProductsLoading: false,
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state, products: [], loading: true, error: null };
    }

    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.map((product) => product),
        loading: false,
        error: null,
      };
    }

    case GET_PRODUCTS_ERROR: {
      return { ...state, products: [], loading: false, error: action.payload };
    }

    // Single product

    case GET_ONE_PRODUCT: {
      return { ...state, oneProduct: {}, loading: true, error: null };
    }

    case GET_ONE_PRODUCT_SUCCESS: {
      return {
        ...state,
        oneProduct: action.payload,
        loading: false,
        error: null,
      };
    }

    case GET_ONE_PRODUCT_ERROR: {
      return {
        ...state,
        oneProduct: {},
        loading: false,
        error: action.payload,
      };
    }

    // Pagination

    case GET_PART_OF_PRODUCTS: {
      return {
        ...state,
        products: [],
        loading: true,
        error: false,
        productsOver: false,
      };
    }

    case GET_PART_OF_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.limitedProductList.map((product) => product),
        loading: false,
        productsOver: action.payload.isOver,
      };
    }

    case GET_PART_OF_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case GET_SEARCH_PRODUCTS: {
      return { ...state, searchProducts: [], searchProductsLoading: true };
    }

    case GET_SEARCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        searchProducts: action.payload,
        searchProductsLoading: false,
      };
    }

    case GET_SEARCH_PRODUCTS_ERROR: {
      return { ...state, searchProducts: [], searchProductsLoading: false };
    }

    default: {
      return state;
    }
  }
}
