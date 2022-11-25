import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from "../firebaseConfig";

export const LaptopContext = createContext();

export const LaptopContextProvider = ({ children }) => {
    const [laptops, setLaptops] = useState([]);
    const [currentLaptop, setCurrentLaptop] = useState([]);

    useEffect(() => {
        onSnapshot(collection(database, 'laptops'), (data) => {
            setLaptops(data.docs.map(item => {
                return { ...item.data(), id: item.id }
            }))
        })
    }, []);

    return (
        <LaptopContext.Provider value={{ laptops, currentLaptop, setCurrentLaptop}}>
            {children}
        </LaptopContext.Provider>
    );
}