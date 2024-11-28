import axios from "axios";
import { IBudget } from "../interfaces/interfaces";

export const budgetPost = async (budgetData: IBudget) => {
  const userId = localStorage.getItem("userId");
  const sendData = { ...budgetData, userId };
  const response = await axios.post(
    "https://fintrack-json.onrender.com/budget",
    sendData
  );
  return response.data;
};


export const getBudget = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `https://fintrack-json.onrender.com/budget?userId=${userId}`
  );
  return response.data;
};