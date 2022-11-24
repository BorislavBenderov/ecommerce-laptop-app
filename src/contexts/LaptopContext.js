import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from "../firebaseConfig";

export const LaptopContext = createContext();

export const LaptopContextProvider = ({ children }) => {
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        onSnapshot(collection(database, 'laptops'), (data) => {
            setLaptops(data.docs.map(item => {
                return { ...item.data(), id: item.id }
            }))
        })
    }, []);

    return (
        <LaptopContext.Provider value={{ laptops }}>
            {children}
        </LaptopContext.Provider>
    );
}