import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { io, Socket } from 'socket.io-client'
import { Comment } from "./socket.interfaces";
import { Button, Input } from "@nextui-org/react";

interface IUserComment {
    collectionItemId: number,
    userId: number,
    text: string
}

const socket: Socket = io('http://localhost:5000/');

const TestScreen = () => {

    const [comments, setComments] = useState<string[]>([]);
    const [user, setUser] = useState<string>("Vova");
    const [comment, setComment] = useState<string>('')

    const handleChangeValue = (text: string) => {
        setComment(text)
    }
    
    useEffect(() => {
        socket.on('comment', (e) => setComments((prev) => [...prev, e]));
        return () => {
            socket.off('comment');
        }
    }, [socket, comments]);

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [])

    const sendMessage = (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('comment', comment)
        setComment('');
    };

    return <>
        <div>
            {comments && comments.map((item) => (
                <div>{item}</div>
            ))}
        </div>
        <form onSubmit={(e) => sendMessage(e)}>
            <Input 
                value={comment}
                onChange={(e) => handleChangeValue(e.target.value)}
            />
            <Button type="submit" onSubmit={(e) => sendMessage(e)}>WHA</Button>
        </form>
    </>
}

export default TestScreen;