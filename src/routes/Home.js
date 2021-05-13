import React, { useEffect, useState } from "react";
import { DBService, StorageService } from "fbase";
import { v4 as uuidV4 } from "uuid";

import Board from "../components/Board";

const Home = ({ userObj }) => {
    const [mind, setMind] = useState("");
    const [minds, setMinds] = useState([]);
    const [attachment, setAttachment] = useState("");

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

    const onChangeFile = (e) => {
        const { target: { files } } = e;

        // only one file
        const theFile = files[0];

        // file reader
        const reader = new FileReader();


        // end event for load to the file 
        reader.onloadend = (e) => {
            const { target: { result } } = e;

            setAttachment(result);
        }

        // load to the url for file data 
        reader.readAsDataURL(theFile);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = StorageService.ref().child(`${userObj.uid}/${uuidV4()}`);
            const response = await fileRef.putString(attachment, "data_url");

            attachmentUrl = await response.ref.getDownloadURL();
        }

        await DBService.collection("minds").add({
            creator: userObj.uid,
            text: mind,
            createdAt: Date.now(),
            attachmentUrl,
        });
        setMind("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's your mind?" maxLength={120} onChange={onChange} value={mind} required />
                <input type="file" accept="image/*" onChange={onChangeFile} />
                <input type="submit" value="share" />
            </form>
            <div>
                <img src={attachment} witdh="50px" height="50px" />
            </div>
            <div>

                {minds.map(mind =>
                    <Board key={mind.id} mindObj={mind} isOwner={mind.creator === userObj.uid} />
                )}
            </div>
        </div>
    );
}

export default Home;