import React, { useState } from 'react';
import { AppNavigator } from "./src/navigations/AppNavigator";
import { UserContext } from "./src/context/userContext";
import { User } from "./src/types/user";

export default function App() {
    const [user, setUser] = useState({} as User);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppNavigator />
        </UserContext.Provider>
    );
}



