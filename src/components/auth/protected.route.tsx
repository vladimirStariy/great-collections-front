import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "../../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import DeniedScreen from "../layout/denied.screen";
import { useReauth } from "../../store/hooks/useReauth";
import { useRefreshQuery } from "../../store/services/auth.service";
import { useAppDispatch } from "../../store/store";
import { useGetUsersMutation } from "../../store/services/user.service";

interface IPayload {
    email: string;
    isAdmin: boolean;
}

export const ProtectedAdminRoute = () => {
    const token = useSelector(selectCurrentToken);
    const reauth = useReauth();

    const handleTokenData = () => {
        if(token) {
            if(jwtDecode<IPayload>(token).isAdmin) return true;
            else {
                reauth();
            }
        }
        return false;
    }

    return <>
        { handleTokenData() ? 
            <Outlet />
            :            
            <DeniedScreen title="ACCESS DENIED" message="" />
        }
    </>
}

export const ProtectedAuthRoute = () => {
    const token = useSelector(selectCurrentToken);

    return <>
        { token ? 
            <Outlet />
            :            
            <DeniedScreen title="ACCESS DENIED" message="" />
        }
    </>
}