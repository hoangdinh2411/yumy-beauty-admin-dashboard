import React, { useState } from "react";
import { Input, Button } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";

const styleForInput = { marginBottom: "16px" }
function Form() {
  const { handleCloseModal } = useModal();
  const [formData, setFormData] = useState(null);
  const imgFile = false;
  const handleSubmit = () => {};

  const handleChange = (e) => {};
  return (
    <div className={styles.addForm}>
      <h1 className={styles.heading}>Add new service </h1>
      <div className={styles.addFile}>
        <ul className={styles.inputs}>
          <li>
            <Input
              sx={styleForInput}
              name="selectedFile"
              type="file"
              placeholder="aa"
            />
          </li>
          <li>
            <Input
              sx={styleForInput}
              type="text"
              name="serviceName"
              placeholder="What service do you get to customer?"
              title="Name"
            />
          </li>
          <li>
            <Input
              sx={styleForInput}
              type="text"
              placeholder="How much is it? "
              title="Price"
              name="price"
            />
          </li>
          <li>
            <Input
              sx={styleForInput}
              type="text"
              placeholder="What category do the service belong to?"
              title="Category"
              name="category"
            />
          </li>
          <li>
            <Input
              sx={styleForInput}
              type="text"
              placeholder="How many minuter do the service take?"
              title="Time up to"
              name="timeTake"
            />
          </li>
        </ul>
        <div className={styles.filePreview}>
          {(imgFile && (
            <img className={styles.view} src={imgFile} alt="" />
          )) || (
            <span className={styles.note}>
              * Select a image for the service *
            </span>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button handleClick={handleCloseModal} type="submit">
          Cancel
        </Button>
        <Button type="submit" handleClick={handleSubmit}>
          <FaPlusCircle />
          Add new
        </Button>
      </div>
    </div>
  );
}

export default Form;
