import axios from "axios";
import { IAddGoal, IG } from "../interfaces/interfaces";
import { update } from "lodash";


export const postGoal = async (goalData: IAddGoal) => {
  const userId = localStorage.getItem("userId");
  const sendData = { ...goalData, userId };
  const response = await axios.post("http://localhost:3001/goals", sendData);
  return response.data;
};


export const Goals = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:3001/goals?userId=${userId}`
  );
  return response.data;
};


export const updateSavings= async(updatedGoal:IG) => {
    const response = await axios.put(
      `http://localhost:3001/goals/${updatedGoal.id}`,
      updatedGoal
    );
    return response.data
}

// export const updateSavings = async (updatedGoal: IG) => {
//   try {
//     // Assuming you're making a PUT request to update the goal in the backend
//     const userId = localStorage.getItem("userId");
//     const response = await fetch(
//       `http://localhost:3001/goals?userId=${userId}/${updatedGoal.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedGoal),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update savings");
//     }

//     const updatedData = await response.json();
//     return updatedData;
//   } catch (error) {
//     console.error("Error updating savings:", error);
//     throw error;
//   }
// };
