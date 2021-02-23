import { useState, useEffect, createContext, useContext } from 'react';
import { useFHIRClient } from './FHIRClientContext';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const fhirClient = useFHIRClient();
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState(null);

    useEffect(() => {
        async function getUserData() {
            try {
                const currentUser = await fhirClient.user.read();
                if (currentUser) {
                    setUser(currentUser);
                }
                const idToken = await fhirClient.getIdToken();
                setIdToken(idToken);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
        console.log(idToken);
    }, [fhirClient]);

    return (
        user &&
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
        );
};