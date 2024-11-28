import axios from "axios";
import { IAddGoal, IG } from "../interfaces/interfaces";
import { update } from "lodash";


export const postGoal = async (goalData: IAddGoal) => {
  const userId = localStorage.getItem("userId");
  const sendData = { ...goalData, userId };
  const response = await axios.post(
    "https://fintrack-json.onrender.com/goals",
    sendData
  );
  return response.data;
};


export const Goals = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `https://fintrack-json.onrender.com/goals?userId=${userId}`
  );
  return response.data;
};


export const updateSavings= async(updatedGoal:IG) => {
    const response = await axios.put(
      `https://fintrack-json.onrender.com/goals/${updatedGoal.id}`,
      updatedGoal
    );
    return response.data
}
