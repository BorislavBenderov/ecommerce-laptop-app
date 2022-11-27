import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";

export const CartItem = ({ laptop }) => {
    const { currentUser } = useContext(UserContext);

    const onDeleteCartItem = async () => {
        await updateDoc(doc(database, 'users', currentUser.uid), {
            cart: arrayRemove(laptop)
        })
    }

    return (
        <div className="product">
            <img className="cart-product-image" src={laptop.image} alt="" />
            <div className="item-desc">
                <div className="flex top">
                    <h5>{laptop.title}</h5>
                    <h4>${laptop.price}</h4>
                    <i className="fa fa-trash" aria-hidden="true" onClick={onDeleteCartItem}></i>
                </div>
            </div>
        </div>
    );
}