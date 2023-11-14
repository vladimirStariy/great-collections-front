import { Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";
import AuthTab from "./auth.tab";
import ThemeTab from "./theme.tab";
import { BurgerIcon } from "../../icons/icons";


const NavigationBar = () => {
    return <>
        <nav className="sticky top-0 bg-base-100 shadow-md flex justify-center">
            <div className="max-w-screen-2xl w-full">
                <div className="navbar py-2 px-0 pl-0 lg:pl-4 2xl:pl-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <BurgerIcon />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 left-1">
                                <li><Link to='/' className="text-lg">Main</Link></li>
                                <li><Link to='/collections' className="text-lg">Collections</Link></li>
                            </ul>
                        </div>
                        <Link to='/' className="
                            normal-case font-bold
                            sm:text-sm
                            md:text-md
                            2xl:text-2xl
                            xl:text-xl
                            lg:text-lg
                        ">
                            GREAT COLLECTIONS
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link to='/' className="text-lg">Main</Link></li>
                            <li><Link to='/collections' className="text-lg">Collections</Link></li>
                        </ul>                  
                    </div>
                    <div className="navbar-end">
                        <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="border-0 h-10 w-full input max-w-sm hidden lg:flex" 
                            />
                            <ThemeTab />
                            <LanguageSelect />
                            <AuthTab />
                        </div>
                    </div>
                </div>           
            </div>
        </nav>
    </>
}

export default NavigationBar;