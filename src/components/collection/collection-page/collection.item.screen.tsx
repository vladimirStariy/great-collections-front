import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { useGetCollectionItemQuery } from "../../../store/services/collection.service";
import { Link, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { GetCollectionItemResponse } from "../../../store/models/collection";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../store/slices/authSlice";
import { ActiveHeartIcon, HeartIcon } from "../../icons/icons";
import { useLikeCollectionItemMutation } from "../../../store/services/profile.service";

interface IUserComment {
    collectionItemId: number,
    userId: number,
    text: string
}

interface IComment {
    id: number, 
    text: string, 
    username: string, 
    createdDate: Date
}

let socket: Socket;

const CollectionItemPage = () => {
    const {id} = useParams();

    const auth = useSelector(selectCurrentToken);

    const {data: itemData, isSuccess} = useGetCollectionItemQuery(Number(id));
    const [collectionItemData, setCollectionItemData] = useState<GetCollectionItemResponse>();
    
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentInputValue, setCommentInputValue] = useState<string>('')
    const [liked, setLiked] = useState<boolean | undefined>(undefined);
    const [likes, setLikes] = useState<number>(0);

    const handleChangeValue = (text: string) => {
        setCommentInputValue(text)
    }

    const sendComment = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await socket.emit('comment', {userId: 0, collectionItemId: Number(id), text: commentInputValue})
        setCommentInputValue('');
    };

    const likeItem = async () => {
        await socket.emit('like-item', {collectionItemId: Number(id)})
        setLiked(true);
    };

    const unlikeItem = async () => {
        await socket.emit('unlike-item', {collectionItemId: Number(id)})
        setLiked(false);
    };

    const date = (rawDate: Date) => {
        function padTo2Digits(num: number) {
            return num.toString().padStart(2, '0');
        }
        const date = new Date(rawDate)
        const formattedDate = [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') + 
        ' ' + 
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
        return formattedDate;
    } 

    const handleSetLikesAndLiked = (e: any) => {
        setLikes(e.likes)
        setLiked(e.isLiked)
    }

    useEffect(() => {
        if(isSuccess) setCollectionItemData(itemData)
    }, [itemData])

    useEffect(() => {
        if(socket) {
            socket.on('comment', (e) => setComments((prev) => [...prev, e]));
            socket.on('getComments', (e) => setComments(e));
            socket.on('getLikes', (e) => handleSetLikesAndLiked(e));
            socket.on('like-item', (e) => setLikes((prev) => prev+e))
            socket.on('unlike-item', (e) => setLikes((prev) => prev-e))
        }
        return () => {
            if(socket) {
                socket.off('comment');
                socket.off('getComments');
                socket.off('getLikes');
                socket.off('like-item')
                socket.off('unlike-item')
            }
        }
    }, [socket, comments]);

    useEffect(() => {
        const connect = async () => {
            socket = io(`${process.env.REACT_APP_BASE_URL}`, {
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
        socket.emit('getComments', Number(id))
        socket.emit('getLikes', Number(id))
        return () => {
            socket.disconnect();
        };
    }, [])

    return <>
        <Breadcrumbs size='lg' className="px-4 pb-4" underline='hover'>
            <BreadcrumbItem href="/collections">Collections</BreadcrumbItem>
            <BreadcrumbItem href={`/collection/${collectionItemData?.collection_id}`}>{collectionItemData?.collection.name}</BreadcrumbItem>
            <BreadcrumbItem>{collectionItemData?.name}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col w-full gap-4">
            <div className="w-full flex justify-center bg-gradient-to-r from-fuchsia-500 to-violet-500 p-8 rounded-xl">
                <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-start items-start'>
                    <div className="w-full flex flex-row text-white justify-between items-center">
                        <div className="text-3xl font-black text-bold ">
                            {collectionItemData?.name.toUpperCase()}
                        </div>
                        <div>
                            {liked === true ? <>
                                <div className="flex flex-row items-center gap-4">
                                    {likes}
                                    <div onClick={unlikeItem}>
                                        <ActiveHeartIcon />
                                    </div>
                                </div> 
                            </> : liked === false? <>
                                <div className="flex flex-row items-center gap-4">
                                    {likes}
                                    <div onClick={likeItem}>
                                        <HeartIcon />
                                    </div>
                                </div>
                            </> : <>
                                <div className="flex flex-row items-center gap-4">
                                    {likes}
                                    <div>
                                        <HeartIcon />
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full justify-start px-4'>
                {collectionItemData ? <>
                    {collectionItemData.collectionFields.map((item, index) => {
                        return <div>{item.name}:{item.value}</div>
                    })}
                </> : <>
                    
                </>}
            </div>
            
        </div>
        <div>
            <Card className="w-full mt-8 mb-4 p-1">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="font-semibold leading-none text-default-600">Comments</h4>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
        { auth ? <>
                <form onSubmit={(e) => sendComment(e)} className="w-full flex flex-row gap-4">
                    <Input
                        multiple
                        className="w-full"
                        value={commentInputValue}
                        onChange={(e) => handleChangeValue(e.target.value)}
                        variant="bordered"
                        maxLength={300}
                        label="Comment"
                        placeholder="Put your comment here..."
                    />
                    <Button type="submit" onSubmit={(e) => sendComment(e)} variant='bordered'>Send</Button>
                </form>
            </> : <div className="pl-4"><Link className="link text-blue-600" to='/auth'>Sign in</Link> to leave comments and likes</div>
            }
        <div className="flex flex-col gap-4 pt-4 pb-8">
            {comments && comments.map((item) => (
                <Card className="w-full">
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" name={item.username} />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.username}  </h4>
                                <h5 className="text-small tracking-tight text-default-400">
                                    {date(item.createdDate)}
                                </h5>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-8 py-0 text-small text-default-400">
                        <p>
                            {item.text}
                        </p>
                    </CardBody>
                    <CardFooter className="gap-3"></CardFooter>
                </Card>
            ))}
        </div>

    </>
}

export default CollectionItemPage;