import LaptopImg from '../../assets/laptop.jpg';
import LP from '../../assets/laptop-2.jpg';
import { LaptopCard } from './LaptopCard';
import { useSelector } from 'react-redux';

export const Laptops = () => {
    const { laptops } = useSelector((store) => store.laptops);

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
                        <h2 className="card-title">Laptops</h2>
                    </div>
                    <div className="card-content">
                        <h2 className="card-title"></h2>
                    </div>
                </div>
            </section>
            <section className="laptops">
                <div className="laptops-grid">
                    {laptops?.map(laptop => <LaptopCard key={laptop.id} laptop={laptop} />)}
                </div>
                <section className='banner-2'>
                    <div className="banner-card">
                        <img
                            src={LP}
                            className="banner-img-2"
                            alt=""
                        />
                    </div>
                </section>
            </section>
        </>
    );
}