import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="">
            <div className="navbar">
                <div className="navbar-nav">
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>
                </div>
                <div className="navbar-actions">
                    <form className="navbar-form">
                        <input
                            type="text"
                            name="search"
                            placeholder="I'm looking for..."
                            className="navbar-form-search"
                        />
                    </form>
                    <Link to="/login" className="navbar-signin">
                        <span>Login</span>
                    </Link>
                    <Link to="/register" className="navbar-signin">
                        <span>Register</span>
                    </Link>
                    <span>email</span>
                    <Link to="/order" className="navbar-signin">
                        <span>My Order</span>
                    </Link>
                    <Link to="/create" className="navbar-signin">
                        <span>Create Order</span>
                    </Link>
                    <Link to="#" className="navbar-signin">
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}