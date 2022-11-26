import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { LaptopContext } from "../../../contexts/LaptopContext";
import { database } from "../../../firebaseConfig";
import { AddToCart } from "./AddToCart";
import { BuyNow } from "./BuyNow";

export const LaptopDetails = () => {
    const { currentLaptop, setCurrentLaptop } = useContext(LaptopContext);
    const { loggedUser } = useContext(AuthContext);
    const { laptopId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        onSnapshot(doc(database, 'laptops', laptopId), (snapshot) => {
            setCurrentLaptop({ ...snapshot.data(), id: snapshot.id });
        })
    }, []);

    const onDelete = (e) => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            e.preventDefault();

            deleteDoc(doc(database, 'laptops', laptopId))
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
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
                <div className="details-buttons">
                    <AddToCart currentLaptop={currentLaptop} />
                    <BuyNow currentLaptop={currentLaptop} />
                    {loggedUser?.uid === 'tDBOgC5e3VUMwYQJEyECdljlKhV2'
                        ? <>
                            <Link to={`/edit/${currentLaptop.id}`} className="add">Edit</Link>
                            <button className="buy" onClick={onDelete}>Delete</button>
                        </>
                        : ''}
                </div>
            </section>
        </div>
    );
}