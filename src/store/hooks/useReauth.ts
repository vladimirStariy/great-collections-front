import { useRefreshQuery } from "../services/auth.service"
import { setCredentials } from "../slices/authSlice";
import { useAppDispatch } from "../store";

export const useReauth = () => {
    const {data: refresh, refetch} = useRefreshQuery();
    const dispatch = useAppDispatch();
    
    const handleRefresh = () => {
        refetch();
        if(refresh && refresh.access) dispatch(setCredentials({access: refresh.access}))
        return refresh?.access;
    }

    return handleRefresh;
}