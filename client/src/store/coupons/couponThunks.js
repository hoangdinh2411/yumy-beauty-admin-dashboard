import couponActions from "./actions";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
import couponsAPI from "api/axios/couponsAPI";

//Category
const couponThunks = {
  createNew: (couponData) => {
    return (dispatch) => {
      return couponsAPI
        .create(couponData)
        .then((data) => {
          dispatch(couponActions.createCategory(data));
          showSuccessMessageAlert("Create coupon success", dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err);
        });
    };
  },

  getAll: () => {
    return (dispatch) => {
      return couponsAPI
        .get()
        .then((data) => {
          if (data.length > 0) {
            dispatch(couponActions.fetching(data));
          }
          return;
        })
        .catch((err) => {
          showErrorMessageAlert(err);
        });
    };
  },

  // update: (id, newData) => {
  //   return (dispatch) => {
  //     return categoryAPI
  //       .update(id, newData)
  //       .then(() => {
  //         dispatch(couponActions.updateCategory(id, newData));
  //         showSuccessMessageAlert("Update success", dispatch);
  //       })
  //       .catch((err) => {
  //         showErrorMessageAlert(err, dispatch);
  //       });
  //   };
  // },
  // delete : (id)=>{
  //   return (dispatch) => {
  //     return categoryAPI.delete(id)
  //       .then(()=>{
  //         dispatch(couponActions.deleteCategory(id));
  //         dispatch(servicesActions.deleteByCategory(id))
  //         showSuccessMessageAlert("Delete category success", dispatch);
  //       })
  //       .catch((err) => {
  //         showErrorMessageAlert(err);
  //       });
  //   }
  // }
};

export default couponThunks;
