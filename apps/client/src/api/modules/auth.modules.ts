import { TAuth } from "../../types/auth";
import { axiosInstance } from "../../utils/axios";

const authEndpoints = {
  signin: "/signin",
  signup: "/signup",
};

const authApi = {
  signin: async () => {
    try {
      const data = await axiosInstance.get(authEndpoints.signin);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  
  signup: async (body: TAuth) => {
    try {
      const data = await axiosInstance.post(authEndpoints.signup, body);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authApi;
