export interface ISignup {
    userName: string,
    email: string,
    password: string
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  userId: string;
}


export interface ILogin {
  email: string;
  password: string;
}

export interface ITTest {
  amount: number;
  category: string;
  date: string; 
  description: string;
  id: string;
  type: "income" | "expense"; 
  userId: string;
};


export interface Itransaction {
    type: string,
    amount: number,
    category: string,
    date:Date,
    description: string
}

export interface ITran {
  id: string;
  type: string;
  amount: number;
  category: string;
  date: Date | null;
  description: string;
}

export interface IT {
  id: string;
  type: string;
  amount: number;
  category: string;
  date: Date | null;
  description: string;
  userId:string;
}


export interface IBudget {
  category: string;
  amount: number;
  monthYear: string| null;
}
export interface IB {
    id: string,
    category: string,
    amount: number,
    monthYear: string,
    userId: string
}


export interface INewtransaction {
  type: [];
  amount: number;
  category: string;
  date: Date | null;
  description: string;
}

export interface IAddGoal {
  goalName: string;
  targetAmount: number;
  startDate: Date | null;
  endDate: Date | null;
  savings: number;
}

export interface IG {
  id: string;
  goalName: string;
  targetAmount: number;
  startDate: Date | null;
  endDate: Date | null;
  savings: number;
  userId: string;
}