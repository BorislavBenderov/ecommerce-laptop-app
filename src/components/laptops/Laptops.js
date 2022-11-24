import { useContext } from 'react';
import LaptopImg from '../../assets/laptop.jpg';
import { LaptopContext } from '../../contexts/LaptopContext';
import { LaptopCard } from './LaptopCard';

export const Laptops = () => {
    const { laptops } = useContext(LaptopContext);
    
    return (
        <>
            <section className="banner">
                <div className="banner-card">
                    <img
                        src={LaptopImg}
                        className="banner-img"
                        alt=""
                    />
                    <div className="card-content">
                        <h2 className="card-title"></h2>
                    </div>
                </div>
            </section>
            <section className="laptops">
                <div className="laptops-grid">
                    {laptops.map(laptop => <LaptopCard key={laptop.id} laptop={laptop}/> )}
                </div>
            </section>
        </>
    );
}