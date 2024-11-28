import axios from "axios";
import { ILogin, ISignup } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


export const signup = async(formData:ISignup) => {
    const allUser = await axios.get(`https://fintrack-json.onrender.com/user`);
     const emailExists = allUser.data.some(
       (user: { email: string }) => user.email === formData.email
     );

     if (emailExists) {
       return {
         message: "Email already exists. Please log in.",
       };
     }
    const sendData = {...formData, userId: uuidv4()}
    const response = await axios.post(
      "https://fintrack-json.onrender.com/user",
      sendData
    );
    return response.data
}


export const login = async (formData: ILogin) => {
  const response = await axios.get(`https://fintrack-json.onrender.com/user`);
  const allUser = response.data
  console.log("All User: ", allUser);
  const loggedInUser = allUser.find((user:any) => user.email == formData.email)
   if (!loggedInUser) {
     return { message: "Email does not exist. Please sign up first." };
   }
   if (loggedInUser.password !== formData.password) {
     return { message: "Incorrect password. Please try again." };
   }
   return { message: "Login successful", user: loggedInUser };
};
