export const Login = () => {
    return (
        <form className='auth'>
            <h3>Login Here</h3>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
    );
}