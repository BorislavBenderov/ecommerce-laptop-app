import { useSelector } from "react-redux";

export const PaymentCard = ({ laptop }) => {
    const { laptops } = useSelector((store) => store.laptops);
    const currentLaptop = laptops.find(x => x.id === laptop.laptopId);

    return (
        <div className="ordered-item" key={laptop.id}>
            <img src={laptop.image} alt="" />
            <p>{laptop.title}</p>
            <p>{laptop.quantity}</p>
            <p>x</p>
            <p>${currentLaptop.price}</p>
        </div>
    );
}