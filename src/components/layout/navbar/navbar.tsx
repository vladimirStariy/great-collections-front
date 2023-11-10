import { Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";
import AuthTab from "./auth.tab";


const NavigationBar = () => {
    return <>
        <nav className="sticky top-0 bg-base-100 border-b-2 flex justify-center">
            <div className="max-w-screen-2xl w-full ">
                <div className="navbar py-2">
                    <div className="navbar-start">
                        <Link to='/' className="normal-case text-2xl font-bold">GREAT COLLECTIONS</Link>
                    </div>
                    <div className="navbar-center w-2/4">
                        <input type="text" placeholder="Search..." className="border-0 h-10 w-full input max-w-sm" />
                    </div>
                    <div className="navbar-end">
                        <div className="flex flex-row gap-2">
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