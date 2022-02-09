import React from "react";
import styles from "./table.module.css";
import { tableHeadersCoupons } from "constants";
import Column from "./column";
import { useSelector } from "react-redux";
function CategoriesTable() {
  const coupons = useSelector((state) => state.coupons);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {tableHeadersCoupons.map((item, index) => {
              return (
                <th key={index}>
                  <p  className={styles.text}>{item}</p>
                </th>
              );
            })}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((item) => {
            return (
              <tr key={item._id} className={styles.content}>
                <Column item={item} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CategoriesTable);
