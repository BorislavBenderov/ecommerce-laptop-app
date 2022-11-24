import LaptopImg from '../../assets/laptop.jpg';

export const Laptops = () => {
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
                                src=""
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
                                <span className="genre">opa</span>
                                <span className="year">2022</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}