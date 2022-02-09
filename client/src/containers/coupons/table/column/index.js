import useCategoriesContext from "hooks/categoriesHook copy";
import { useDispatch } from "react-redux";
import styles from "./column.module.css";
import categoryThunks  from 'store/categories/categoryThunks';

function Column({ item }) {
  const { setCurrentCategoriesId } = useCategoriesContext();
  const status = (new Date().getTime() > new Date(item.endDate).getTime()) ? "Yes" : "No" 
  const dispatch = useDispatch()
  const handleEditCategory = (e) => {
    const id = e.target.dataset.id;
    setCurrentCategoriesId(id);
  };

  const handleDeleteCategory = (e) => {
    const id = e.target.dataset.id;
    dispatch(categoryThunks.delete(id))
  };
  return (
    <>
      <td className={styles.items}>
        <span className={styles.text}>{item.id}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.name}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.code}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.percentage} %</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.startDate}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.endDate}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.createdBy}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text} style={{color: status==="Yes" ? 'red': 'green', fontWeight: '600'}}>{status}</span>
      </td>
      <td>
        <span
          className={styles.button}
          title="Edit Category"
          data-id={item._id}
          onClick={handleEditCategory}
        >
          Edit
        </span>
      </td>
      <td>
        <span
          className={styles.button}
          title="Delete category"
          data-id={item._id}
          onClick={handleDeleteCategory}
        >
          Delete
        </span>
      </td>
    </>
  );
}

export default Column;
