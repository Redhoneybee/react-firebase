import React, { useEffect, useState } from "react";
import { DBService } from "fbase";

import Board from "../components/Board";

const Home = ({ userObj }) => {
    const [mind, setMind] = useState("");
    const [minds, setMinds] = useState([]);

    const getMinds = async () => {
        const loadMinds = await DBService.collection("minds").get();

        loadMinds.forEach(mind => {
            const mindObj = {
                ...mind.data(),
                id: mind.id,
            };

            setMinds((prev) => [
                mindObj,
                ...prev
            ]);
        });
    }

    useEffect(() => {
        getMinds();
    }, []);
    const onChange = (e) => {
        const { target: { value } } = e;

        setMind(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

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
            <div>

                {minds.map(mind =>
                    <Board key={mind.id} mindObj={mind} isOwner={mind.creator === userObj.uid} />
                )}
            </div>
        </div>
    );
}

export default Home;