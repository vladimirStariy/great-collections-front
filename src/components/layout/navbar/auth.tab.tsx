const AuthTab = () => {
    return <>
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">Click</label>
            <ul tabIndex={0} className="top-16 dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
                <li><div>Login</div></li>
                <li><div>Register</div></li>
            </ul>
        </div>
    </>
}

export default AuthTab;