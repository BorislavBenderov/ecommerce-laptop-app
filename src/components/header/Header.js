export const Header = () => {
    return (
        <header className="">
            <div className="navbar">
                <div className="navbar-nav">
                    <a to="/" className="navbar-link">
                        Home
                    </a>
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
                    <a to="/login" className="navbar-signin">
                        <span>Login</span>
                    </a>
                    <a to="/register" className="navbar-signin">
                        <span>Register</span>
                    </a>
                    <span>email</span>
                    <a to="/order" className="navbar-signin">
                        <span>My Order</span>
                    </a>
                    <a to="/create" className="navbar-signin">
                        <span>Create Order</span>
                    </a>
                    <a to="#" className="navbar-signin">
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </header>
    );
}