import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        const { target: { name, value } } = e;

        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();


    }
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="email" placeholder="Email" onChange={onChange} value={email} required />
                    <input type="password" name="password" placeholder="Password" onChange={onChange} value={password} required />
                    <input type="submit" value="SignIn" />
                </form>
            </div>
            <div>
                <button>
                    <span>Connection with Google</span>
                </button>
                <button>
                    <span>Connection with Github</span>
                </button>
            </div>
        </div>
    );
}

export default Auth;