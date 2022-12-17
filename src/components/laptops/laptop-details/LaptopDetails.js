import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LaptopContext } from "../../../contexts/LaptopContext";
import { database } from "../../../firebaseConfig";
import { AddToCart } from "./AddToCart";
import { LaptopCard } from "../LaptopCard";
import { BuyNow } from "./BuyNow";
import { useSelector } from "react-redux";

export const LaptopDetails = () => {
    const { currentLaptop, setCurrentLaptop, laptops } = useContext(LaptopContext);
    const loggedUser = useSelector((store) => store.user.user);
    const { laptopId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        onSnapshot(doc(database, 'laptops', laptopId), (snapshot) => {
            setCurrentLaptop({ ...snapshot.data(), id: snapshot.id });
        })
    }, [laptopId]);

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
        <>
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
            <div className="also-like">
                <h2>You May Also Like</h2>
                <section className="laptops">
                    <div className="laptops-grid">
                        {laptops.filter(laptop => laptop.id !== currentLaptop.id).map(laptop => <LaptopCard key={laptop.id} laptop={laptop} />)}
                    </div>
                </section>
            </div>
        </>
    );
}