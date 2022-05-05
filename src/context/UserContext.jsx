import { createContext, useContext, useState } from "react";
import { getUser, signInUser } from '../services/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser || {email: null });

    const login = async (email, password) => {
        const authenticatedUser = await signInUser({ email, password });

    if (authenticatedUser) {
        setUser(authenticatedUser);
      }
    };

    const logout = () => {
        setUser({ email: null });
    };

    return (
        // .provider component makes the redux store available to any nested components that need access to the redux store.
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser has to be used within useProvider');
    }
    return context;
}