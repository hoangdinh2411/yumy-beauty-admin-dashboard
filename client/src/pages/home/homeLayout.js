import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./homepage.module.css";
import Appbar from "containers/appbar";
import { Modal, Navbar } from "components";
import { ModalContext } from "context/modalContext";
function HomeLayout() {
  const [modalStatus, setModalStatus] = useState({
    body: null,
    showModal: false,
  });

  return (
    <ModalContext.Provider value={{ modalStatus, setModalStatus }}>
      <Navbar />
      <div className="content">
        <div className={styles.wrapper}>
          <div className={`${styles.appbar} glass-primary`}>
            <Appbar />
          </div>
          <div className={`${styles.content} glass-primary`}>
            <Outlet />
          </div>
        </div>
      </div>
      <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
        {modalStatus.body}
      </Modal>
    </ModalContext.Provider>
  );
}

export default HomeLayout;
