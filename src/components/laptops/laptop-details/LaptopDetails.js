import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LaptopContext } from "../../../contexts/LaptopContext";
import { database } from "../../../firebaseConfig";
import { AddToCart } from "./AddToCart";

export const LaptopDetails = () => {
    const { currentLaptop, setCurrentLaptop } = useContext(LaptopContext);
    const { laptopId } = useParams();
    const [quantity, setQuantity] = useState(1);
    

    useEffect(() => {
        onSnapshot(doc(database, 'laptops', laptopId), (snapshot) => {
            setCurrentLaptop({ ...snapshot.data(), id: snapshot.id });
        })
    }, []);

    const minus = () => {
        if (quantity < 2) {
            return;
        }

        setQuantity(state => state -= 1);
    }

    const plus = () => {
        setQuantity(state => state += 1);
    }

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
                <div className="quantity">
                    <h4>Quantity: </h4>
                    <div className="quntity-metrics">
                        <span className="minus" onClick={minus}>-</span>
                        <p className="number">{quantity}</p>
                        <span className="plus" onClick={plus}>+</span>
                    </div>
                </div>
                <div className="details-buttons">
                    <AddToCart currentLaptop={currentLaptop} quantity={quantity}/>
                    <button className="buy">Buy now</button>
                </div>
            </section>
        </div>
    );
}