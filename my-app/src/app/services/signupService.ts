import axios from "axios";
import { ILogin, ISignup } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


export const signup = async(formData:ISignup) => {
    const sendData = {...formData, userId: uuidv4()}
    const response = await axios.post("http://localhost:3001/user", sendData);
    return response.data
}


export const login = async (formData: ILogin) => {
  const response = await axios.get(`http://localhost:3001/user`);
  const allUser = response.data
  console.log("All User: ", allUser);
  const loggedInUser = allUser.find((user:any) => user.email == formData.email)
  console.log("Here Service: ", loggedInUser)
  //loggedInUser is an object in array. I want only the object. not the array
  return loggedInUser;
};
