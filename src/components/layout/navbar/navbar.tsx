import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";

const NavigationBar = () => {
    return <>
        <Navbar className="self-start">
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