import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "../components/ToggleThemeButton";
import "./LandingPage.css"; 
import logo from './logo.jpg'

const LandingPage = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    // const [users, setUsers] = useState([]);
    const [signUpError, setSignUpError] = useState("");
    const [signInError, setSignInError] = useState("");
    const [accountCreatedMessage, setAccountCreatedMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
        setSignInError("");
        setAccountCreatedMessage("");
        document.querySelector('.sign-in-form').reset();
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
        setSignUpError("");
        document.querySelector('.sign-up-form').reset();
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        const usernameOrEmail = e.target.elements[0].value;
        const password = e.target.elements[1].value;

        if (!usernameOrEmail || !password) {
            setSignInError("Please fill in all fields!");
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password) {
            navigate('/home');
        } else {
            setSignInError("Incorrect username/email or password!");
        }
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const username = e.target.elements[0].value;
        const email = e.target.elements[1].value;
        const password = e.target.elements[2].value;
        const reEnterPassword = e.target.elements[3].value;

        if (!username || !email || !password || !reEnterPassword) {
            setSignUpError("Please fill in all fields!");
            return;
        }

        if (password !== reEnterPassword) {
            setSignUpError("Passwords do not match!");
            return;
        }

        const user = { username, email, password };
        localStorage.setItem('user', JSON.stringify(user));
        console.log("User signed up:", user);

        // Clear error message and switch to sign-in mode
        setSignUpError("");
        setIsSignUpMode(false);
        setAccountCreatedMessage("Account created successfully! You can sign in now.");
    };

    return (
        <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
            <ToggleThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Sign In Form */}
                    <form className={`sign-in-form ${isSignUpMode ? "opacity-0" : ""}`} onSubmit={handleSignInSubmit}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username or Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        {signInError && <p className="error-message">{signInError}</p>}
                        {accountCreatedMessage && <p className="success-message">{accountCreatedMessage}</p>}
                        <input type="submit" value="Login" className="btn solid" />
                    </form>

                    {/* Sign Up Form */}
                    <form className={`sign-up-form ${isSignUpMode ? "" : "opacity-0"}`} onSubmit={handleSignUpSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Re-enter Password" />
                        </div>
                        {signUpError && <p className="error-message">{signUpError}</p>}
                        <input type="submit" className="btn" value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                {/* Left Panel */}
                <div className="panel left-panel">
                    <div className="content">
                        <img src={logo} className="logo" alt="Logo" />
                        <h3>New here ?</h3>
                        <p>
                            You can sign up to create an account and access the HR system.
                        </p>
                        <button className="btn transparent" onClick={handleSignUpClick}>
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="panel right-panel">
                    <div className="content">
                        <img src={logo} className="logo" alt="Logo" />
                        <h3>One of us ?</h3>
                        <p>
                            If you already have an account, click the button below to sign in.
                        </p>
                        <button className="btn transparent" onClick={handleSignInClick}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
