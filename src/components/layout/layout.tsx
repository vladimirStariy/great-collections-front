import Footer from "./footer/footer";
import NavigationBar from "./navbar/navbar";
import AppRouter from "./router/app.router";

const Layout = () => {
    return <>
        <NavigationBar />
        <AppRouter />
        <Footer />
    </>
}

export default Layout;