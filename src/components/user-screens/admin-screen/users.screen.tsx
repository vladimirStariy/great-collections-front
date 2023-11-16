import { useState, useEffect } from "react";
import { useBlockUsersRangeMutation, useGetUsersMutation, useRemoveUsersRangeMutation, useUnblockUsersRangeMutation } from "../../../store/services/user.service";
import { IUser, IUsersRequest } from "../../../store/models/user";
import GreatTable from "../../../UI/table/table";
import Button from "../../../UI/button/button";
import { BlockIcon, ClearAdminIcon, GrantAdminIcon, TrashIcon, UnlockIcon } from "../../icons/icons";
import NextTable from "../../../UI/next-table/next.table";

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

    const handleSelect = (value: boolean, id: number) => {
        if(value) setSelected([...selected, id])
        else setSelected(selected.filter((item) => item !== id))
    }

    const handleSelectAll = (value: boolean) => {
        if(value && data !== undefined) setSelected(data.map(({id}) => id));
        else setSelected([]);
    };


    useEffect(() => {
        handleGetUsersData();
    }, [])

    return <>
        <div className="flex w-full justify-center pt-8">
            <div className="flex flex-col w-full max-w-screen-2xl gap-8">
                <div className="flex flex-row justify-between bg-base-200 p-4 rounded-lg items-center">
                    <div className="flex flex-row justify-start items-center gap-4">
                        <Button isLoading={blockUsersLoading} onClick={handleBlockUsersRange} label="Block"><BlockIcon /></Button>
                        <Button isLoading={unblockUsersLoading} onClick={handleUnblockUsers} label="Unblock"><UnlockIcon /></Button>
                        <Button isLoading={removeUsersLoading} onClick={handleRemoveUsersRange} label="Remove"><TrashIcon /></Button>
                        <Button label="Grant admin privileges"><GrantAdminIcon /></Button>
                        <Button label="Remove admin privileges"><ClearAdminIcon /></Button>
                    </div>
                    <input placeholder="Search here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="flex flex-column w-full justify-center items-center"> 
                    {data.length > 0 ? <>
                        <NextTable 
                            data={data}
                            isSelectable
                            selected={selected}
                            handleSelect={handleSelect}
                            handleSelectAll={handleSelectAll}
                        />
                    </> : <></>}
                </div> 
            </div>
        </div>
    </>
}

export default UsersScreen;