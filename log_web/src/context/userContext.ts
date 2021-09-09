import { createContext } from "react";
import { User } from '../types/User'
export interface user {
    uid: string
    name: string
    userId: string
    user: [],
    setUser: (user: user) => null
}
type UserContextValue = {
    user: User | null,
    setUser: (user: User) => void
}
export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: (user: User) => null
})