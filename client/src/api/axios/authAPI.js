import axiosClient from "./axiosConfig";
const url = "/users";

const authAPI = {
  adminSignUp: async (data) => {
    return  await axiosClient.post(url+'/signup', data);
  },
  adminSignIn: async (data) => {
    return await axiosClient.post(url+'/signin', data);
  },
  updateProfile : async(id,newData) =>{
    return await axiosClient.patch(`${url}/${id}`,newData)
  }

};
export default authAPI;
