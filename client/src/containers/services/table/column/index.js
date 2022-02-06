import useServicesContext from "hooks/servicesHook";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import servicesThunks from "store/services/servicesThunks";
import styles from "./column.module.css";

function Column({ item ,category}) {
  const dispatch = useDispatch();
  const { setCurrentServiceId } = useServicesContext();
  const handleEditService = (e) => {
    const id = e.target.dataset.id;
    setCurrentServiceId(id);
  };

  const handleDeleteService = (e) => {
    if(window.confirm("Are you sure?") === true){
      const id = e.target.dataset.id;
      dispatch(servicesThunks.deleteService(id));
    }
    
  };
  return (
    <>
      <td className={styles.items}>
        <img className={styles.image} src={item.selectedFile} alt=""></img>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.name}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{category?.name}</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.price} kr</span>
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.timeTake} minutes</span>
      </td>
      <td className={styles.items}>
        {item?.staffs?.length > 0
          ? item?.staffs?.map((staff) => (
              <>
                <p className={styles.staffs}>{"$" + staff.toUpperCase()} </p>
              </>
            ))
          : "Nobody"}
      </td>
      <td className={styles.items}>
        <span className={styles.text}>{item.createdBy}</span>
      </td>
      <td>
        <span
          className={styles.button}
          title="Edit service"
          data-id={item._id}
          onClick={(e) => handleEditService(e)}
        >
          Edit
        </span>
      </td>
      <td>
        <span
          className={styles.button}
          title="Delete service"
          data-id={item._id}
          onClick={(e) => handleDeleteService(e)}
        >
          Delete
        </span>
      </td>
      <td>
        <Link
          to={`/services/${item._id}`}
          className={styles.button}
          title="Info about the service"
          data-id={item._id}
        >
          Info
        </Link>
      </td>
    </>
  );
}

export default React.memo(Column);
