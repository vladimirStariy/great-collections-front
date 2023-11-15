import NavigationBar from "./navbar/navbar";
import AppRouter from "./router/app.router";

import { NextUIProvider } from "@nextui-org/react";

const Layout = () => {
    return <NextUIProvider className="h-screen">
        <NavigationBar />
        <AppRouter />
    </NextUIProvider>
}

export default Layout;