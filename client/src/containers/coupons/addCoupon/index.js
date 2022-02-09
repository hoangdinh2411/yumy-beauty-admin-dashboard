import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, Input } from "components";
import styles from "./addCoupon.module.css";
import useModal from "hooks/modalHook";
import AddCouponsForm from "./forms/addCouponsForm";
import { useDispatch } from "react-redux";
import filterActions from "store/filter/actions";
import useCategoriesContext from "hooks/categoriesHook copy";

const searchStyle = { marginRight: "12px" };
function AddCoupons({ auth }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { handleShowModal, handleCloseModal } = useModal();
  // const handleSearchText = useCallback((e) => {
  //   setSearchValue(e.target.value);
  //   dispatch(filterActions.search(e.target.value));
  // }, []);

  // useEffect(() => {
  //   if (!currentCategoriesId) return;
  //   handleShowModal(
  //     <AddCouponsForm
  //       categories={categories}
  //       auth={auth}
  //     />
  //   );
  //   return () => {};
  // }, [currentCategoriesId]);
  return (
    <div className={styles.form}>
      <Input
        sx={searchStyle}
        value={searchValue}
        // handleChange={handleSearchText}
        name="search"
        type="search"
        id="searchCoupon"
        placeholder="Search coupon by name or code... "
      />
      <Button
        sx={{ marginRight: "12px" }}
        handleClick={() => handleShowModal(<AddCouponsForm auth={auth} />)}
      >
        Add Coupon
      </Button>
    </div>
  );
}

export default React.memo(AddCoupons);
