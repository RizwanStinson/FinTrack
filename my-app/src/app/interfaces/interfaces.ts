export interface ISignup {
    userName: string,
    email: string,
    password: string
}

export interface Itransaction {
    type: string,
    amount: number,
    category: string,
    date:Date | null,
    description: string
}