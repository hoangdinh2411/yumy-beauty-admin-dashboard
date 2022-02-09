import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCategory from "./addCoupon";
import CategoriesTable from "./table";
import useModal from "hooks/modalHook.js";
import { useLocation } from "react-router-dom";
import CouponsProvider from "context/couponContext";
import couponThunks from 'store/coupons/couponThunks';

function Coupons() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentCouponId, setCurrentCouponId] = useState(null);
  const { modalStatus } = useModal();
  const auth = JSON.parse(localStorage.getItem("authInfo"));
  // const currentCategory = currentCategoriesId
  //   ? categories.find((item) => item._id === currentCategoriesId)
  //   : null;
  // useEffect(() => {
  //   if (currentCategoriesId) {
  //     if (!modalStatus.showModal) {
  //       setCurrentCategoriesId(null);
  //     }
  //   }
  //   return () => {};
  // }, [currentCategoriesId]);
  
  useEffect(()=>{
    dispatch(couponThunks.getAll())
  },[])
  return (
    <CouponsProvider value={{currentCouponId, setCurrentCouponId}}>
      <h3>{location.state}</h3>
      <AddCategory
        auth={auth}
      />
      {/* <UploadCsvFileForm /> */}
      <CategoriesTable  />
    </CouponsProvider>
  );
}

export default Coupons;
