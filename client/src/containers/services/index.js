import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddService from "./addService";
import ServicesTable from "./table";
import { serviceRemainingSelector } from "store/selector.js";
import ServicesProvider from "context/servicesContext";
import useModal from "hooks/modalHook.js";
import { useLocation } from "react-router-dom";

function Services() {
  const location = useLocation();

  const [currentServiceId, setCurrentServiceId] = useState(null);
  const { modalStatus } = useModal();
  const auth = JSON.parse(localStorage.getItem("authInfo"));
  const services = useSelector(serviceRemainingSelector);
  const currentService = currentServiceId
    ? services.find((service) => service._id === currentServiceId)
    : null;

  useEffect(() => {
    if (currentServiceId) {
      if (!modalStatus.showModal) {
        setCurrentServiceId(null);
      }
    }
    return () => {};
  }, [modalStatus]);

  return (
    <ServicesProvider value={{ currentServiceId, setCurrentServiceId }}>
      <h3>{location.state}</h3>

      <AddService auth={auth} currentService={currentService} />
      {/* <UploadCsvFileForm /> */}
      <ServicesTable services={services} />
    </ServicesProvider>
  );
}

export default React.memo(Services);
