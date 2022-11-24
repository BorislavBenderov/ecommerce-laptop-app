import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../../firebaseConfig";

export const LaptopDetails = () => {
    const [currentLaptop, setCurrentLaptop] = useState([]);
    const { laptopId } = useParams();

    useEffect(() => {
        onSnapshot(doc(database, 'laptops', laptopId), (snapshot) => {
            setCurrentLaptop({ ...snapshot.data(), id: snapshot.id });
        })
    }, []);

    return (
        <div className="laptop-details">
            <section className="laptop-image">
                <img src={currentLaptop.image} alt="" />
            </section>
            <section className="laptop-info">
                <h1>{currentLaptop.title}</h1>
                <div className="details-desc">
                    <p>Details:</p>
                    <p>{currentLaptop.description}</p>
                </div>
                <h2 className="price">{currentLaptop.price}$</h2>
                <h4>Quantity: 1</h4>
                <div className="details-buttons">
                    <button className="add">Add to cart</button>
                    <button className="buy">Buy now</button>
                </div>
            </section>
        </div>
    );
}