import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownItem, Avatar, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../store/slices/authSlice";

const NavigationBar = () => {
    const auth = useSelector(selectCurrentToken);

    return <>
        <Navbar isBordered maxWidth={"xl"} className="py-4 px-0">
            <NavbarBrand>
                <p className="font-bold text-xl">GREAT COLLECTIONS</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
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
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Input 
                        variant="bordered"
                        isClearable
                        placeholder="Search..."
                    />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="w-full w-40">
                    <LanguageSelect />
                </NavbarItem>
                {auth ? <>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                name="user"
                                isBordered
                                as="button"
                                className="transition-transform"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">                       
                            <DropdownItem key="my_collections">
                                My collections
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </> : <>
                    <NavbarItem className="hidden lg:flex">
                        <Link to='/auth'>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to='/auth'>
                            Sign Up
                        </Link>
                    </NavbarItem>
                </>}
            </NavbarContent>
        </Navbar>
    </>
}

export default NavigationBar;