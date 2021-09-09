import { createContext } from "react";

export interface user {
    uid: string
    name: string
    userId: string
}
export const userContext = createContext({} as user)