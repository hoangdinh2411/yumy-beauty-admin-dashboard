import React from "react";
import { Button, Select, Input } from "components";
import styles from "./addService.module.css";
import { selectByCategories, selectByPrices } from "constants";
import useModal from "hooks/modalHook";
import Form from "./form";

function AddService() {
  const { handleShowModal } = useModal();

  return (
    <div className={styles.form}>
      <Input type="search" id="searchService" placeholder="Search" />
      <Select options={selectByCategories} />
      <Select options={selectByPrices} />
      <Button
        variant={styles.button}
        handleClick={() => handleShowModal(<Form />)}
      >
        Add New
      </Button>
    </div>
  );
}

export default AddService;
