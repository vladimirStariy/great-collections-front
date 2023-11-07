import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import DeniedScreen from "../layout/denied.screen";

interface IPayload {
    email: string;
    isAdmin: boolean;
}

const ProtectedAdminRoute = () => {
    const token = useSelector(selectCurrentToken);

    const handleTokenData = () => {
        if(token) {
            if(jwtDecode<IPayload>(token).isAdmin) return true;
        }
        return false;
    }

    return <>
        { token && handleTokenData() ? 
            <Outlet />
            :            
            <DeniedScreen title="ACCESS DENIED" message="" />
        }
    </>
}

export default ProtectedAdminRoute;