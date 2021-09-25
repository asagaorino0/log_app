import { createContext } from "react";
import { User } from '../types/User'
type UserContextValue = {
    user: User | null,
    setUser: (user: User) => void
};
export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: (user: User) => null
});

