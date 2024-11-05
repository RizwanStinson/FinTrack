import axios from "axios";
import { IBudget } from "../interfaces/interfaces";

export const budgetPost = async (budgetData: IBudget) => {
  const userId = localStorage.getItem("userId");
  const sendData = { ...budgetData, userId };
  const response = await axios.post("http://localhost:3001/budget", sendData);
  return response.data;
};


export const getBudget = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:3001/budget?userId=${userId}`
  );
  return response.data;
};