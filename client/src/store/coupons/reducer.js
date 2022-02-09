import { actionTypes } from "./actions";
const initialState = [];

const couponReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCHING_COUPONS:
      return payload;
    case actionTypes.ADD_COUPON:
      return [...state, payload];
    // case actionTypes.UPDATE_CATEGORY:
    //   const {name, updatedBy} = payload.newData
    //   return state.map((item) =>
    //     item._id === payload.id ? {...item, name, updatedBy} : item
    //   );
    // case actionTypes.DELETE_CATEGORY:
    //   return state.filter((item) => item._id !== payload);
    default:
      return state;
  }
};

export default couponReducers;
