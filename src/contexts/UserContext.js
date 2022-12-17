import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../firebaseConfig";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const loggedUser = useSelector((store) => store.user.user);
    const currentUser = users.find(user => user.uid === loggedUser?.uid);
    const totalPrice = currentUser?.cart?.reduce((acc, curVal) => acc + Number(curVal.price),
        0);

    useEffect(() => {
        onSnapshot(collection(database, 'users'), (snapshot) => {
            setUsers(snapshot.docs.map((item) => {
                return { ...item.data() };
            }));
        })
    }, []);

    return (
        <UserContext.Provider value={{ users, currentUser, totalPrice }}>
            {children}
        </UserContext.Provider>
    );
}