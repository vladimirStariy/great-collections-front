import { useState, useEffect } from "react";
import { useBlockUsersRangeMutation, useGetUsersMutation, useRemoveUsersRangeMutation, useUnblockUsersRangeMutation } from "../../../store/services/user.service";
import { IUser, IUsersRequest } from "../../../store/models/user";
import { BlockIcon, ClearAdminIcon, GrantAdminIcon, TrashIcon, UnlockIcon } from "../../icons/icons";
import NextTable from "../../../UI/next-table/next.table";
import { Button } from "@nextui-org/react";

const UsersScreen = () => {
    const [getUsers] = useGetUsersMutation();
    const [blockUsers, {isLoading: blockUsersLoading}] = useBlockUsersRangeMutation();
    const [unblockUsers, {isLoading: unblockUsersLoading}] = useUnblockUsersRangeMutation();
    const [removeUsers, {isLoading: removeUsersLoading}] = useRemoveUsersRangeMutation();
    
    const [selected, setSelected] = useState<number[]>([]);

    const [data, setData] = useState<IUser[]>([]);

    const handleGetUsersData = async () => {
        const response = await getUsers({page: 1, recordsQuantity: 10} as IUsersRequest).unwrap();
        if(response) setData(response);
    }
    
    const handleUnblockUsers = async () => {
        await unblockUsers({Ids: selected}).unwrap();
        handleGetUsersData();
    }

    const handleBlockUsersRange = async () => {
        await blockUsers({Ids: selected}).unwrap();
        handleGetUsersData();
    } 

    const handleRemoveUsersRange = async () => {
        await removeUsers({Ids: selected}).unwrap();
        handleGetUsersData();
    }

    const handleSelect = (selectedItems: number[] | string) => {
        if(selectedItems === "all") {
            let arr: number[] = [];
            data.map((item) => arr.push(item.id))
            setSelected(arr);
        } else {
            let arr: number[] = [];
            (selectedItems as number[]).map((item) => arr.push(item))
            setSelected(arr);
        }
    }

    const checker = () => {
        console.log(selected)
    }

    useEffect(() => {
        handleGetUsersData();
    }, [])

    return <>
        <div className="flex w-full justify-center pt-8">
            <div className="flex flex-col w-full max-w-screen-2xl gap-8">
                <div className="flex flex-row justify-between bg-base-200 p-4 rounded-lg items-center">
                    <div className="flex flex-row justify-start items-center gap-4">
                        <Button isLoading={blockUsersLoading} onClick={handleBlockUsersRange} variant='bordered'>Block <BlockIcon /></Button>
                        <Button isLoading={unblockUsersLoading} onClick={handleUnblockUsers} variant='bordered'>Unblock <UnlockIcon /></Button>
                        <Button isLoading={removeUsersLoading} onClick={handleRemoveUsersRange} variant='bordered'>Remove <TrashIcon /></Button>
                        <Button onClick={checker} variant='bordered'>Grant admin privellegies<GrantAdminIcon /></Button>
                        <Button variant='bordered'><ClearAdminIcon /></Button>
                    </div>
                </div>
                <div className="flex flex-column w-full justify-center items-center"> 
                    {data.length > 0 ? <>
                        <NextTable 
                            data={data}
                            isSelectable
                            selected={selected}
                            handleSelect={handleSelect}
                        />
                    </> : <></>}
                </div> 
            </div>
        </div>
    </>
}

export default UsersScreen;