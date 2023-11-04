import { Route, Routes } from 'react-router-dom'
import MainScreen from '../../main-screen/main.screen';

const AppRouter = () => {
    return <Routes>
        <Route path='/' element={<MainScreen />} />
    </Routes>
}

export default AppRouter;