import { useContext } from 'react';
import LaptopImg from '../../assets/laptop.jpg';
import { LaptopContext } from '../../contexts/LaptopContext';

export const Laptops = () => {
    const { laptops } = useContext(LaptopContext);
    console.log(laptops);
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
                    <div className="laptops-card">
                        <div className="card-head">
                            <img
                                src="https://p.jarcomputers.com/350x350/2a/NBHP2X7X1EA_6_350x350.jpg"
                                alt=""
                                className="card-img"
                            />
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Opa</h3>
                            <div className="card-info">
                                <span className="genre">$60</span>
                            </div>
                        </div>
                    </div>
                    <div className="laptops-card">
                        <div className="card-head">
                            <img
                                src="https://images.prismic.io/frameworkmarketplace/46cbf974-cdff-4cd8-b761-8b4a3343f6c4_FW-chromebook-homepage-carousel.png?auto=compress,format"
                                alt=""
                                className="card-img"
                            />
                            <div className="card-overlay">
                                <div className="rating">
                                    <span>7</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Opa</h3>
                            <div className="card-info">
                                <span className="genre">$60</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}