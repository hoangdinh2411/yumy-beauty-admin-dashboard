import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";

import { Input, Button, Select } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import servicesThunks from "store/services/servicesThunks";
import { getFormData, showErrorMessageAlert } from "utils/services";

const styleForInput = { marginBottom: "20px", width: "100%" };
function AddServiceForm({
  categories,
  auth,
  currentService,
  currentServiceId,
  setCurrentServiceId,
}) {
  const dispatch = useDispatch();
  const { handleCloseModal } = useModal();
  const services = useSelector((state) => state.services);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    currentServiceId ? currentService["category"] : ""
  );
  const [selectedFile, setSelectedFile] = useState(
    currentServiceId ? currentService["selectedFile"] : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Neu trung category, thi check co trung ten service ko? neu k thi cho add
    const { name, price, timeTake, staffs, description } = getFormData(e);

    let formIsValid = false;
    if (currentService) {
      formIsValid = true;
    } else {
      formIsValid = services.every((service) => {
        if (service.category === selectedValue) {
          if (service.name === name) {
            return false;
          }
        }
        return true;
      });
    }

    setWasSubmitted(true);
    if (formIsValid) {
      const serviceData = {
        name,
        price,
        staffs: staffs.split(","),
        timeTake,
        selectedFile,
        category: selectedValue,
        description
      };
      if (currentServiceId) {
        dispatch(
          servicesThunks.updateService(currentServiceId, {
            ...serviceData,
            updatedBy: auth?.result?.fullName,
          })
        );
        setCurrentServiceId(null);
      } else {
        dispatch(
          servicesThunks.addNew({
            ...serviceData,
            createdBy: auth?.result?.fullName,
          })
        );
        e.currentTarget.reset();
        setSelectedValue("");
        setSelectedFile("");
        setWasSubmitted(false);
      }
    
    } else {
      showErrorMessageAlert(
        currentServiceId
          ? "Change something if you want"
          : "Service already exist",
        dispatch
      );
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSelectFile = ({ base64 }) => {
    setSelectedFile(base64);
  };

  return (
    <div className={styles.addForm}>
      <h1 className={styles.heading}>Add new service </h1>
      <div className={styles.addFile}>
        <div className={styles.inputs}>
          <form noValidate onSubmit={handleSubmit}>
            <Input
              value={currentServiceId ? currentService["name"] : ""}
              wasSubmitted={wasSubmitted}
              title="Name"
              type="text"
              showErrorMessage
              name="name"
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["price"] : ""}
              wasSubmitted={wasSubmitted}
              title="Price"
              type="text"
              showErrorMessage
              name="price"
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["timeTake"] : ""}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Time up to"
              type="text"
              name="timeTake"
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["staffs"] : ""}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Staff *(separate with a ',' example:  John,Kevin)"
              type="text"
              name="staffs"
              sx={styleForInput}
            />
            <Select
              wasSubmitted={wasSubmitted}
              options={categories}
              defaultValue="Category"
              title="Category"
              showErrorMessage
              handleChange={handleChange}
              value={selectedValue}
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["description"] : ""}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Description"
              type="textarea"
              name="description"
              sx={styleForInput}
            />
            <div className={styles.buttons}>
              <Button handleClick={handleCloseModal} type="button">
                Cancel
              </Button>
              <Button type="submit">
                <FaPlusCircle />
                {currentServiceId ? "Update" : "Add new"}
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.filePreview}>
          <FileBase type="file" multiple={false} onDone={handleSelectFile} />
          {wasSubmitted && selectedFile === "" ? (
            <span className={styles.note}>
              * Select a image for the service *
            </span>
          ) : (
            <img
              className={styles.view}
              src={selectedFile}
              alt={selectedFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AddServiceForm);
