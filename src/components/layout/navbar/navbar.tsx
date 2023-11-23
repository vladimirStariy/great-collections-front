import { Navbar, Link as NextLink, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownItem, Avatar, DropdownMenu, DropdownTrigger, Input, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LanguageSelect from "./language-select/language.select";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentToken } from "../../../store/slices/authSlice";
import { useLogoutMutation } from "../../../store/services/auth.service";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NavigationBar = () => {
    const auth = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [logout] = useLogoutMutation()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleLogout = async () => {
        await logout();
        dispatch(logOut());
        navigate('/', { replace: true })
    } 

    const handleClose = () => {
        setIsMenuOpen(false)
    }

    return <div className="w-full mt-16">
        <Navbar onMenuOpenChange={setIsMenuOpen}  isBordered maxWidth={"xl"} className="md:py-4 px-0 fixed">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden"
            />
            <NavbarBrand>
                <Link to='/' className="font-bold text-xl">GREAT COLLECTIONS</Link>
            </NavbarBrand>
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink to='/' color="foreground">
                        {t("mainLabel")}
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to='/collections' color="foreground">
                        {t("collectionsLabel")}
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden lg:flex gap-4" justify="center">
                <NavbarItem>
                    <Input 
                        variant="bordered"
                        isClearable
                        placeholder={`${t("searchPlaceholder")}...`}
                    />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden md:flex gap-4" justify="end">
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
                                <Link to='/my-collections'>{t("myCollections")}</Link>
                            </DropdownItem>
                            <DropdownItem onClick={handleLogout} key="logout" color="danger">
                                {t("logout")}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </> : <>
                    <NavbarItem className="hidden lg:flex">
                        <Link to='/auth'>{t("signIn")}</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to='/auth'>
                            {t("signUp")}
                        </Link>
                    </NavbarItem>
                </>}
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key='1'>
                    <NextLink 
                        onClick={handleClose}
                        color='primary'
                        className="w-full"
                        href="/"
                        size="lg"
                    >
                        {t("mainLabel")}
                    </NextLink>
                </NavbarMenuItem>
                <NavbarMenuItem key='2'>
                    <NextLink 
                        onClick={handleClose}
                        color='primary'
                        className="w-full"
                        href="/collections"
                        size="lg"
                    >
                        {t("collectionsLabel")}
                    </NextLink>
                </NavbarMenuItem>
                { auth ? <>
                    <NavbarMenuItem key='3'>
                        <NextLink 
                            onClick={handleClose}
                            color='primary'
                            className="w-full"
                            href="/my-collections"
                            size="lg"
                        >
                            {t("myCollections")}
                        </NextLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key='4'>
                        <NextLink 
                            onClick={handleLogout}
                            color='primary'
                            className="w-full"
                            href="/collections"
                            size="lg"
                        >
                            {t("logout")}
                        </NextLink>
                    </NavbarMenuItem>
                </> : <></>
                }
            </NavbarMenu>
        </Navbar>
    </div>
}

export default NavigationBar;