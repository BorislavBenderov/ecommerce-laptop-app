import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import { database } from "../../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

export const AddToCart = ({ currentLaptop, quantity }) => {
    const { loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const navigate = useNavigate();
    const currentUser = users.find(user => user.uid === loggedUser?.uid);

    let cartPrice = 0;
    let sameLaptopPrice = 0;

    currentUser?.cart.forEach(price => cartPrice += price.price);
    currentUser?.cart.forEach(price => price.title.includes(currentLaptop.title) ? sameLaptopPrice += price.price : sameLaptopPrice);

    const addedToCart = () => {
        if (loggedUser) {
            updateDoc(doc(database, 'users', loggedUser.uid), {
                cart: arrayUnion({
                    title: currentLaptop.title,
                    price: currentLaptop.price * quantity,
                    id: uuidv4()
                })
            })
                .then(() => {
                    alert('Added to Cart!');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            navigate('/login');
        }

    }

    return (
        <button className="add" onClick={addedToCart}>Add to cart</button>
    );
}