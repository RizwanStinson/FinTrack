import axios from "axios";
import { IAddGoal } from "../interfaces/interfaces";

export const postGoal = async (goalData: IAddGoal) => {
  const userId = localStorage.getItem("userId");
  const sendData = { ...goalData, userId };
  const response = await axios.post("http://localhost:3001/goals", sendData);
  return response.data;
};
