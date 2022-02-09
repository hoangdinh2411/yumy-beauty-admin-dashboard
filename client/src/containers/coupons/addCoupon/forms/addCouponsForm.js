import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Input, Button } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import { createIDForCoupon, getFormData, showErrorMessageAlert } from "utils/services";
import couponThunks from "store/coupons/couponThunks";
const styleForInput = { marginBottom: "20px", width: "100%" };
const today = new Date();

function AddCouponsForm({ auth }) {
  const dispatch = useDispatch();
  const { handleCloseModal } = useModal();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [campaignStartTime, setCampaignStartTime] = useState(today);
  const [campaignEndTime, setCampaignEndTime] = useState(today);
  const [dateError, setDateError] = useState("");
  //to show date
  // console.log(campaignStartTime.toDateString())
  useEffect(() => {
    let dateIsValid = true;
    if (campaignStartTime.getTime() < today.getTime()) {
      setDateError("Don't select old dates");
      dateIsValid = false;
    } else {
      if (campaignEndTime.getMonth() === campaignStartTime.getMonth()) {
        if (campaignEndTime.getDay() <= campaignStartTime.getDay()) {
          setDateError("The end date not be older or the same start day");
          dateIsValid = false;
        }
      }
    }
    if (dateIsValid) {
      setDateError("");
    }
  }, [campaignStartTime, campaignEndTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Neu trung category, thi check co trung ten service ko? neu k thi cho add
    const { name, code, percentage } = getFormData(e);

    let formIsValid = dateError === "";
    // if (currentService) {
    //   formIsValid = true;
    // } else {
    //   formIsValid = services.every((service) => {
    //     if (service.category === selectedValue) {
    //       if (service.name === name) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   });
    // }
    
    setWasSubmitted(true);
    if (formIsValid) {
      const couponData = {
        id : createIDForCoupon(name,code,percentage),
        name,
        code,
        percentage,
        startDate: campaignStartTime.toDateString(),
        endDate: campaignEndTime.toDateString(),
        createdBy: auth?.result.fullName
      };
      dispatch(couponThunks.createNew(couponData))
      e.currentTarget.reset()
      setWasSubmitted(false);
      setCampaignStartTime(today)
      setCampaignEndTime(today)
      handleCloseModal()
    } else {
      showErrorMessageAlert("Coupon already exist", dispatch);
    }

  
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.createCoupon}>
      <h1 className={styles.heading}>Add new service </h1>
      <Input
        value=""
        wasSubmitted={wasSubmitted}
        title="Name"
        type="text"
        showErrorMessage
        name="name"
        sx={styleForInput}
      />
      <Input
        value=""
        wasSubmitted={wasSubmitted}
        title="Code"
        type="text"
        showErrorMessage
        name="code"
        sx={styleForInput}
        placeholder="Month + year / Name + year"
      />
      <Input
        value=""
        wasSubmitted={wasSubmitted}
        showErrorMessage
        title="Percentage"
        type="number"
        name="percentage"
        sx={styleForInput}
        placeholder="%"
      />
      <div>
        <p className={styles.dateTitle}>
          Start data <span className={styles.error}>{`* ${dateError}`}</span>{" "}
        </p>
        <DataPicker
          className={styles.dataPicker}
          selected={campaignStartTime}
          onChange={(date) => setCampaignStartTime(date)}
        />
      </div>
      <div>
        <p className={styles.dateTitle}>
          End data <span className={styles.error}>{`* ${dateError}`}</span>
        </p>
        <DataPicker
          className={styles.dataPicker}
          selected={campaignEndTime}
          onChange={(date) => setCampaignEndTime(date)}
        />
      </div>
      <div className={styles.buttons}>
        <Button handleClick={handleCloseModal} type="button">
          Cancel
        </Button>
        <Button type="submit">
          <FaPlusCircle />
          Add new
          {/* {currentServiceId ? "Update" : "Add new"} */}
        </Button>
      </div>
    </form>
  );
}

export default React.memo(AddCouponsForm);
