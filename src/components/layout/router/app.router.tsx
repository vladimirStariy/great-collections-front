import { Route, Routes } from 'react-router-dom'
import MainScreen from '../../main-screen/main.screen';
import AuthScreen from '../../auth/auth.screen';
import UsersScreen from '../../user-screens/admin-screen/users.screen';
import TestScreen from '../test.screen';
import ProtectedAdminRoute from '../../auth/protected.route';
import CollectionCreationScreen from '../../collection/collection.create.screen';

const AppRouter = () => {
    return <Routes>
        <Route path='/auth' element={<AuthScreen />} />

        <Route element={<ProtectedAdminRoute />} >
            <Route path='/users' element={<UsersScreen />} />
        </Route>

        <Route path='/collection-creation' element={<CollectionCreationScreen />} />

        <Route path='/test' element={<TestScreen />} />

        <Route path='/' element={<MainScreen />} />
    </Routes>
}

export default AppRouter;