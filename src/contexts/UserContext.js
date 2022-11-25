import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { loggedUser } = useContext(AuthContext);
    const currentUser = users.find(user => user.uid === loggedUser?.uid);

    useEffect(() => {
        onSnapshot(collection(database, 'users') , (snapshot) => {
            setUsers(snapshot.docs.map((item) => {
                return { ...item.data() };
            }));
        })
    }, []);

    return (
        <UserContext.Provider value={{ users, currentUser }}>
            { children }
        </UserContext.Provider>
    );
}