import axios from "axios";
import { Itransaction } from "../interfaces/interfaces";


export const transaction = async (transactionData: Itransaction) => {
    const userId = localStorage.getItem("userId")
  const sendData = { ...transactionData, userId };
  const response = await axios.post("http://localhost:3001/details", sendData);
  return response.data;
};


export const getTransaction = async() => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:3001/details?userId=${userId}`);
    return response.data
}