import axios from 'axios';
import { SERVER } from '../../constants/api';
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
} from '../../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const products = await axios.get(`${SERVER}/products`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.responese && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
