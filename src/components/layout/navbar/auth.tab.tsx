import { Link } from "react-router-dom";
import { UserIcon } from "../../icons/icons";

const AuthTab = () => {
    return <>
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost"><UserIcon /></label>
            <ul tabIndex={0} className="top-16 dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
                <li><Link to='/auth'>Login</Link></li>
                <li><Link to='/auth'>Register</Link></li>
            </ul>
        </div>
    </>
}

export default AuthTab;