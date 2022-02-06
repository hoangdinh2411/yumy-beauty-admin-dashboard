import useCategoriesContext from "hooks/categoriesHook copy";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./column.module.css";
import categoryThunks  from 'store/categories/categoryThunks';

function Column({ item }) {
  const { setCurrentCategoriesId } = useCategoriesContext();
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
        <span className={styles.text}>{item.name}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.createdBy}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.updatedBy || "No"}</span>
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
      <td>
        <Link
          to={`/categories/${item._id}`}
          className={styles.button}
          title="Info about the category"
        >
          Info
        </Link>
      </td>
    </>
  );
}

export default Column;
