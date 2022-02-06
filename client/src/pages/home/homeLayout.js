import React, { useState,useEffect } from "react";
import { Outlet ,useLocation} from "react-router-dom";
import styles from "./homepage.module.css";
import Appbar from "containers/appbar";
import { Modal, Navbar } from "components";
import { ModalContext } from "context/modalContext";
import { useDispatch } from "react-redux";
import categoryThunks from "store/categories/categoryThunks";
import servicesThunks from "store/services/servicesThunks";
function HomeLayout() {
  const dispatch = useDispatch();

  const [modalStatus, setModalStatus] = useState({
    body: null,
    showModal: false,
  });
  useEffect(() => {
    dispatch(categoryThunks.getAll());
    dispatch(servicesThunks.getAll());
  }, []);

  return (
    <ModalContext.Provider value={{ modalStatus, setModalStatus }}>
      <Navbar />
      <div className="content">
        <div className={styles.wrapper}>
          <div className={`${styles.appbar} glass-primary`}>
            <Appbar />
          </div>
          <div className={`${styles.content} glass-primary`}>
            <div className={`${styles.container} glass-blur`}>
              <div className={styles.outlet}>
    
                <Outlet />
              </div>
            </div>
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
