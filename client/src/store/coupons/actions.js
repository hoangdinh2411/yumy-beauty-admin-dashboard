export const actionTypes = {
  FETCHING_COUPONS: "fetching coupons",
  ADD_COUPON: "add new coupons",
  // UPDATE_CATEGORY: "update category",
  // DELETE_CATEGORY: "delete category",
};
const couponActions = {
  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_COUPONS,
      payload: data,
    };
  },

  createCategory: (couponData) => {
    return {
      type: actionTypes.ADD_COUPON,
      payload: couponData,
    };
  },
  // updateCategory: (id, newData) => {
  //   return {
  //     type: actionTypes.UPDATE_CATEGORY,
  //     payload: { id, newData },
  //   };
  // },
  // deleteCategory: (id) => {
  //   return {
  //     type: actionTypes.DELETE_CATEGORY,
  //     payload: id,
  //   };
  // },
};

export default couponActions;
