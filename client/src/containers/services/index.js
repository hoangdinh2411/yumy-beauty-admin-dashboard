import React from 'react';
import UploadCsvFileForm from './uploadCsvFile.js'
import AddService from './addService';
import styles from './services.module.css'
import ServicesTable from './table';
function Services() {
  return <div className={`${styles.wrapper} glass-blur`}>
      <h3>Services</h3>
      <AddService/>
      {/* <UploadCsvFileForm /> */}
      <ServicesTable/>
  </div>;
}

export default Services;
