import { Link } from "react-router-dom";

export const LaptopCard = ({ laptop }) => {

    return (
        <>
            <Link to={`/details/${laptop.id}`}>
                <div className="laptops-card">
                    <div className="card-head">
                        <img
                            src={laptop.image}
                            alt=""
                            className="card-img"
                        />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{laptop.title}</h3>
                        <div className="card-info">
                            <span className="genre">${laptop.price}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}