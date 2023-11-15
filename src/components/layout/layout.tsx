import Footer from "./footer/footer";
import NavigationBar from "./navbar/navbar";
import AppRouter from "./router/app.router";

const Layout = () => {
    return <div className="min-h-screen flex flex-col justify-between">
        <div>
            <NavigationBar />
            <AppRouter />
        </div>
        <Footer />
    </div>
}

export default Layout;