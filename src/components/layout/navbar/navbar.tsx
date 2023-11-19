import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";

const NavigationBar = () => {
    return <>
        <Navbar isBordered maxWidth={"xl"} className="self-start py-4 px-0">
            <NavbarBrand>
                <p className="font-bold text-xl">GREAT COLLECTIONS</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink to='/' color="foreground">
                        Main
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to='/collections' color="foreground">
                        Collections
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="w-full w-40">
                    <LanguageSelect />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Link to='/auth'>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to='/auth'>
                        Sign Up
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    </>
}

export default NavigationBar;