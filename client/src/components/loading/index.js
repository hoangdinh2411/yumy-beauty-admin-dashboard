import styles from './loading.module.css';
import loadingImage from 'assets/loading-image.gif'
import React from 'react'
function Loading() {
  return (
    <div className={styles.loadingImg}>
      <img className={styles.image} src={loadingImage} alt="...loading"/>
    </div>
   
  );
}

export default React.memo(Loading);
