import React from "react";
import styles from "./table.module.css";
import { tableHeadersCategories } from "constants";
import Column from "./column";
function CategoriesTable({ categoriesFilter}) {

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {tableHeadersCategories.map((item,index) => {
              return (
                <th key={index} className={styles.text}>
                  {item}
                </th>
              );
            })}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoriesFilter?.map((item) => {
            return (
              <tr key={item._id} className={styles.content}>
                <Column  item={item}/>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CategoriesTable);
