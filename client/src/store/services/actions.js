export const actionTypes = {
  ADD_NEW_SERVICE: "add new service",
  FETCHING_SERVICES: "fetching all services",
  DELETE_SERVICE: "delete service",
  UPDATE_SERVICE: "update service",
  DELETE_SERVICE_BY_CATEGORY : 'delete services by category'
};
const servicesActions = {
  addNew: (serviceData) => {
    return {
      type: actionTypes.ADD_NEW_SERVICE,
      payload: serviceData,
    };
  },

  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_SERVICES,
      payload: data,
    };
  },
  delete: (id) => {
    return {
      type: actionTypes.DELETE_SERVICE,
      payload: id,
    };
  },
  update: (id, newData) => {
    return {
      type: actionTypes.UPDATE_SERVICE,
      payload: { id, newData },
    };
  },
  deleteByCategory: (categoryId) => {
    return {
      type: actionTypes.DELETE_SERVICE_BY_CATEGORY,
      payload: categoryId,
    };
  },
};

export default servicesActions;
