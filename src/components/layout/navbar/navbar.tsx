import { Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";


const NavigationBar = () => {
    return <>
        <nav className="bg-base-200 flex justify-center">
            <div className="max-w-screen-2xl w-full ">
                <div className="navbar pt-4 min-h-0"> 
                    <div className="navbar-start">
                        
                    </div>
                    <div className="navbar-center ">
                        
                    </div>
                    <div className="navbar-end">
                        <div className="flex flex-row items-center gap-2">
                            <Link to='auth'>
                                Login
                            </Link>
                            <Link to='auth'>
                                Registration
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="navbar">
                    <div className="navbar-start">
                        <Link to='/' className="normal-case text-3xl font-bold">GREAT<br /> COLLECTIONS</Link>
                    </div>
                    <div className="navbar-center w-2/4">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="navbar-end">
                        <div>
                            <LanguageSelect />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default NavigationBar;

/*
    <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>Homepage</li>
                                <li>Portfolio</li>
                                <li>About</li>
                            </ul>
                        </div>
                        Homepage
                        Portfolio
                        About
*/