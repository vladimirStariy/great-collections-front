import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownItem, Avatar, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentToken } from "../../../store/slices/authSlice";
import { useLogoutMutation } from "../../../store/services/auth.service";

const NavigationBar = () => {
    const auth = useSelector(selectCurrentToken);
    const dispatch = useDispatch();

    const [logout] = useLogoutMutation()

    const handleLogout = async () => {
        await logout();
        dispatch(logOut());
    } 

    return <>
        <Navbar isBordered maxWidth={"xl"} className="py-4 px-0">
            <NavbarBrand>
                <Link to='/' className="font-bold text-xl">GREAT COLLECTIONS</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarItem>
                    <NavLink to='/' color="foreground">
                        MAIN
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to='/collections' color="foreground">
                        COLLECTIONS
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
                                <Link to='/my-collections'>MY COLLECTIONS</Link>
                            </DropdownItem>
                            <DropdownItem onClick={handleLogout} key="logout" color="danger">
                                LOG OUT
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </> : <>
                    <NavbarItem className="hidden lg:flex">
                        <Link to='/auth'>SIGN IN</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to='/auth'>
                            SIGN UP
                        </Link>
                    </NavbarItem>
                </>}
            </NavbarContent>
        </Navbar>
    </>
}

export default NavigationBar;