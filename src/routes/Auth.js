import React, { useState } from "react";
import { AuthService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const { target: { name, value } } = e;

        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // Create Account...
                data = await AuthService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await AuthService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const onSocialLogin = async (e) => {
        const { target: { name } } = e;
        try {
            let provider;
            if (name === "google") provider = new firebaseInstance.auth.GoogleAuthProvider();
            else if (name === "github") provider = new firebaseInstance.auth.GithubAuthProvider();

            await AuthService.signInWithPopup(provider);
        } catch (error) {
            alert(error.message);
        }
    }

    const toggleAccount = (prev) => setNewAccount(prev => !prev);
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="email" placeholder="Email" onChange={onChange} value={email} required />
                    <input type="password" name="password" placeholder="Password" onChange={onChange} value={password} required />
                    <input type="submit" value={newAccount ? "Join" : "SignIn"} />
                </form>
                {error}
            </div>
            <span onClick={toggleAccount} >{newAccount ? "SignIn" : "Join"}</span>
            <div>
                <button name="google" onClick={onSocialLogin}>Connection With Google</button>
                <button name="github" onClick={onSocialLogin}>Connection With Github</button>
            </div>
        </div>
    );
}

export default Auth;