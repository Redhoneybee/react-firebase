import React, { useState } from "react";
import { DBService } from "fbase";

const Board = ({ mindObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newMind, setNewMind] = useState(mindObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm(`Do you want to delete the post?`);

        if (ok) {
            // want it...
            await DBService.doc(`minds/${mindObj.id}`).delete();
        }
    }
    const onEditClick = () => setEditing(prev => !prev);

    const onChange = (e) => {
        const { target: { value } } = e;

        setNewMind(value);
    }

    const onSubmit = async (e) => {
        if (mindObj.text !== newMind) {
            await DBService.doc(`minds/${mindObj.id}`).update({
                text: newMind
            });
        }
        setEditing(false);
    }

    return (
        <>
            {editing &&
                <div>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="edit your mind" onChange={onChange} value={newMind} required />
                        <input type="submit" value="change the mind" />
                    </form>
                </div>
            }
            <div>
                <h4>{mindObj.text}</h4>
                {isOwner &&
                    <>
                        <button onClick={onDeleteClick}>DELETE</button>
                        <button onClick={onEditClick}>EDIT</button>
                    </>
                }
            </div>
        </>
    );
}

export default Board;