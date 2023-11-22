import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { io, Socket } from 'socket.io-client'
import { Comment } from "./socket.interfaces";
import { Button, Input } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../../store/slices/authSlice";
import { useReauth } from "../../store/hooks/useReauth";

interface IUserComment {
    collectionItemId: number,
    userId: number,
    text: string
}

let socket: Socket;

const TestScreen = () => {
    const auth = useSelector(selectCurrentToken);
    const reauth = useReauth();

    const [comments, setComments] = useState<string[]>([]);
    const [comment, setComment] = useState<string>('')

    const handleChangeValue = (text: string) => {
        setComment(text)
    }
    
    useEffect(() => {
        if(socket) socket.on('comment', (e) => setComments((prev) => [...prev, e]));
        return () => {
            if(socket) socket.off('comment');
        }
    }, [socket, comments]);

    useEffect(() => {
        const connect = async () => {
            socket = io('http://localhost:5000/', {
                transportOptions: { 
                    polling: {
                        extraHeaders: {
                            Authorization: `Bearer ${auth}`,
                        }
                    }
                },
                reconnectionDelay: 3000
            });
        }
        connect();

        return () => {
            socket.disconnect();
        };
    }, [])

    const sendMessage = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
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
        {auth ? <>
            <form onSubmit={(e) => sendMessage(e)}>
                <Input 
                    value={comment}
                    onChange={(e) => handleChangeValue(e.target.value)}
                    />
                <Button type="submit" onSubmit={(e) => sendMessage(e)}>WHA</Button>
            </form>
        </> : <></>
        }
    </>
}

export default TestScreen;