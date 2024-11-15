import axios from "axios";
import { ITran, Itransaction } from "../interfaces/interfaces";


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

export const updateTransaction = async (transaction:any) => {
  const response = await axios.put(
    `http://localhost:3001/details/${transaction.id}`,
    transaction
  );
  return response.data;
};

export const deleteTransaction = async (transactionId:string) => {
  const response = await axios.delete(
    `http://localhost:3001/details/${transactionId}`
  );
  return response.data;
};


export const getExpenseTransaction = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`http://localhost:3001/details`, {
    params: {
      userId,
      type: "expense",
    },
  });
  return response.data;
};