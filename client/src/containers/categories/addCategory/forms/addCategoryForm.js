import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import { Input, Button } from "components";
import categoryThunks from "store/categories/categoryThunks";
import {
  formatCategoryName,
  getFormData,
  showErrorMessageAlert,
} from "utils/services";

function AddCategoryForm({
  auth,
  categories,
  currentCategory,
  currentCategoriesId,
  setCurrentCategoriesI,
}) {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const { handleCloseModal } = useModal();
  const dispatch = useDispatch();

  //Handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = getFormData(e);
    const formIsValid =
      categories.length > 0
        ? categories?.every((value) => value.name !== name)
        : true;
    setWasSubmitted(true);
    if (formIsValid) {
      const data = {
        name: formatCategoryName(name.trim()),
      };
      if (currentCategoriesId) {
        dispatch(
          categoryThunks.update(currentCategoriesId, {
            ...data,
            updatedBy: auth?.result?.fullName,
          })
        );
      } else {
        dispatch(
          categoryThunks.createNew({
            ...data,
            createdBy: auth?.result?.fullName,
          })
        );
        e.currentTarget.reset();
        setWasSubmitted(false);
      }
    } else {
      showErrorMessageAlert(
        currentCategoriesId
          ? "Change something if you want"
          : "Category already exist",
        dispatch
      );
    }
  };

  return (
    <form
      noValidate
      className={styles.createCategoryForm}
      onSubmit={handleSubmit}
    >
      <h1 className={styles.heading}>Create new category</h1>
      <Input
        value={currentCategoriesId ? currentCategory.name : ""}
        wasSubmitted={wasSubmitted}
        sx={{ margin: "12px 0" }}
        type="text"
        name="name"
        title="Category name"
      />
      <div className={styles.buttons}>
        <Button handleClick={handleCloseModal} type="button">
          Cancel
        </Button>
        <Button type="submit">
          <FaPlusCircle />
          {currentCategoriesId ? "Update" : "Create a new"}
        </Button>
      </div>
    </form>
  );
}

export default AddCategoryForm;
