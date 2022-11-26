import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
    const { auth, loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const navigate = useNavigate();

    const currentUser = users.find(user => user.uid === loggedUser?.uid);

    const onLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <header className="">
            <div className="navbar">
                <div className="navbar-nav">
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>
                </div>
                <div className="navbar-actions">
                    {loggedUser?.uid === 'tDBOgC5e3VUMwYQJEyECdljlKhV2'
                        ? <Link to="/create" className="navbar-signin">
                            <span>Create Post</span>
                        </Link>
                        : ''}
                    {!loggedUser
                        ? <>
                            <Link to="/login" className="navbar-signin">
                                <span>Login</span>
                            </Link>
                            <Link to="/register" className="navbar-signin">
                                <span>Register</span>
                            </Link>
                        </>
                        : <>
                            <Link to="/cart" className="navbar-signin">
                                <span>My Cart - {currentUser?.cart?.length}</span>
                            </Link>
                            <Link to="#" className="navbar-signin" onClick={onLogout}>
                                <span>Logout</span>
                            </Link>
                        </>}

                </div>
            </div>
        </header>
    );
}