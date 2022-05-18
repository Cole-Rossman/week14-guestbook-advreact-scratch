import { createContext, useContext, useState } from "react";
import { getUser, signInUser, signOutUser } from '../services/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser || {email: null });

    const login = async (email, password) => {
        const authenticatedUser = await signInUser(email, password);
        console.log('authenticatedUser', authenticatedUser)
    if (authenticatedUser) {
        setUser(authenticatedUser);
      }
    };

    const logout = () => {
        setUser({ email: null });
        signOutUser();
    };

    return (
        // .provider component makes the redux store available to any nested components that need access to the redux store.
        <UserContext.Provider value={{ user, setUser, login, logout, currentUser }}>
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