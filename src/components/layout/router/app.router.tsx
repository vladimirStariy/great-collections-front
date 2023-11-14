import { Route, Routes } from 'react-router-dom'
import MainScreen from '../../main-screen/main.screen';
import AuthScreen from '../../auth/auth.screen';
import UsersScreen from '../../user-screens/admin-screen/users.screen';
import TestScreen from '../test.screen';
import { ProtectedAuthRoute, ProtectedAdminRoute } from '../../auth/protected.route';
import CollectionCreationScreen from '../../collection/collection.create.screen';
import CollectionsScreen from '../../collection/collections.screen';
import CollectionPage from '../../collection/collection page/collection.page.screen';

const AppRouter = () => {
    return <Routes>
        <Route path='/auth' element={<AuthScreen />} />

        <Route element={<ProtectedAdminRoute />} >
            <Route path='/users' element={<UsersScreen />} />
        </Route>

        <Route element={<ProtectedAuthRoute />}>
            <Route path='/collection-creation' element={<CollectionCreationScreen />} />
            <Route path='/collection' element={<CollectionPage />} />
        </Route>

        
        <Route path='/collections' element={<CollectionsScreen />} />



        <Route path='/test' element={<TestScreen />} />

        <Route path='/' element={<MainScreen />} />
    </Routes>
}

export default AppRouter;