import React, { useState } from "react";
import { AuthService } from "fbase";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
    const [displayName, setDisplayName] = useState(userObj.displayName);
    const [error, setError] = useState("");
    const history = useHistory();
    const onSignOut = () => {
        try {
            AuthService.signOut();
            history.push("/");
        } catch (error) {
            alert(error.message);
        }
    }



    const onSubmit = async (e) => {
        e.preventDefault();

        if (userObj.displayName !== displayName) {
            setError("");

            await userObj.updateProfile({
                displayName: displayName
            });

        } else {
            setError("this is same the current your display name");
        }
    }

    const onChange = (e) => {
        const { target: { value } } = e;

        setDisplayName(value);
    }
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Edit your display name" onChange={onChange} value={displayName} required />
                    <input type="submit" value="change the display name" />
                </form>
                {error}
            </div>
            <div>
                <button onClick={onSignOut}>SignOut</button>
            </div>
        </div>
    );
}

export default Profile;