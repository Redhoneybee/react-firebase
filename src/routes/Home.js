import React, { useState } from "react";
import { DBService } from "fbase";

const Home = ({ userObj }) => {
    const [mind, setMind] = useState("");

    const onChange = (e) => {
        const { target: { value } } = e;

        setMind(value);
    }

    const onSubmit = async (e) => {
        await DBService.collection("minds").add({
            creator: userObj.uid,
            text: mind,
            createdAt: Date.now()
        });
        // init
        setMind("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's your mind?" maxLength={120} onChange={onChange} value={mind} required />
                <input type="submit" value="share" />
            </form>
        </div>
    );
}

export default Home;