import React from "react";
import styles from "./table.module.css";
import { tableHeadersServices } from "constants";
import Column from "./column";
import { useSelector } from "react-redux";
function ServicesTable({ services }) {
  const categories = useSelector((state) => state.categories);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {tableHeadersServices.map((item, index) => {
              return (
                <th key={index} className={styles.text}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {services?.map((item) => {
            const category = categories.find(
              (category) => category._id === item.category
            );
            return (
              <tr key={item._id} className={styles.content}>
                <Column item={item} category={category} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ServicesTable);
