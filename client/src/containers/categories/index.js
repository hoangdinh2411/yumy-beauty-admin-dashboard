import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCategory from "./addCategory";
import CategoriesTable from "./table";
import CategoriesProvider from "context/categoriesContext";
import useModal from "hooks/modalHook.js";
import { useLocation } from "react-router-dom";
import { categoriesRemainingSelector } from "store/selector";

function Categories() {
  const location = useLocation();

  const [currentCategoriesId, setCurrentCategoriesId] = useState(null);
  const { modalStatus } = useModal();
  const auth = JSON.parse(localStorage.getItem("authInfo"));
  const categoriesFilter = useSelector(categoriesRemainingSelector);
  const categories = useSelector(state=>state.categories);
  const currentCategory = currentCategoriesId
    ? categories.find((item) => item._id === currentCategoriesId)
    : null;
  useEffect(() => {
    if (currentCategoriesId) {
      if (!modalStatus.showModal) {
        setCurrentCategoriesId(null);
      }
    }
    return () => {};
  }, [currentCategoriesId]);
  
  return (
    <CategoriesProvider value={{ currentCategoriesId, setCurrentCategoriesId }}>
      <h3>{location.state}</h3>
      <AddCategory
        auth={auth}
        categories={categories}
        currentCategory={currentCategory}
      />
      {/* <UploadCsvFileForm /> */}
      <CategoriesTable categoriesFilter={categoriesFilter} />
    </CategoriesProvider>
  );
}

export default Categories;
