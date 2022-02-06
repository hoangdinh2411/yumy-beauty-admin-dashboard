import messageAction from "store/message/actions";

export const formatCategoryName = (textInput) => {
  const text = textInput.toLowerCase();
  const result = text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
  return result;
};

export const getFieldError = (value) => {
  if (!value) return "Please fill here";
  //cac dieu kien khac, se them vao sau

  return null;
};

export const getFormData = (event) => {
  const currentForm = new FormData(event.currentTarget);
  const formData = Object.fromEntries(currentForm.entries());
  // const formData = null
  return formData;
};

export const showSuccessMessageAlert = (text,dispatch) => {
  dispatch(messageAction.addMessage({ success: text  }));
};

export const showErrorMessageAlert = (error, dispatch) => {
  if(typeof error === 'string' ){
    dispatch(messageAction.addMessage({error: error}));
  }
  if (error.response && error.response.data) {
    const errMessage = error.response.data.message;
    dispatch(messageAction.addMessage(errMessage));
  }
};
