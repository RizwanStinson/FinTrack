import axios from "axios";
import { ISignup } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


export const signup = async(formData:ISignup) => {
    const sendData = {...formData, userId: uuidv4()}
    const response = await axios.post("http://localhost:3001/user", sendData);
    return response.data
}