import React from "react";
import { AuthService } from "fbase";
import { useHistory } from "react-router";

const Profile = () => {
    const history = useHistory();
    const onSignOut = () => {
        try {
            AuthService.signOut();
            history.push("/");
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div>
            <div>
                <button onClick={onSignOut}>SignOut</button>
            </div>
        </div>
    );
}

export default Profile;