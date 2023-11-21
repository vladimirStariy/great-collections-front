import { useNavigate } from "react-router-dom";
import NavigationBar from "./navbar/navbar";
import AppRouter from "./router/app.router";

import { NextUIProvider } from "@nextui-org/react";

const Layout = () => {
    const navigate = useNavigate();
    return <NextUIProvider navigate={navigate} className="h-screen flex flex-col gap-4">
        <NavigationBar />
        <AppRouter />
    </NextUIProvider>
}

export default Layout;