import { useRefreshQuery } from "../services/auth.service"
import { setCredentials } from "../slices/authSlice";
import { useAppDispatch } from "../store";

export const useReauth = () => {
    const refresh = useRefreshQuery();
    const dispatch = useAppDispatch();

    const handleRefresh = () => {
        if(refresh.data?.access) dispatch(setCredentials({access: refresh.data.access}))
    }

    return handleRefresh;
}