import { Route, Routes, useLocation } from 'react-router-dom'
import {Tabs, Tab} from "@nextui-org/react";
import MainScreen from '../../main-screen/main.screen';
import AuthScreen from '../../auth/auth.screen';
import UsersScreen from '../../user-screens/admin-screen/users.screen';
import TestScreen from '../test.screen';
import { ProtectedAuthRoute, ProtectedAdminRoute } from '../../auth/protected.route';
import CollectionCreationScreen from '../../collection/collection-editor/collection.create.screen';
import CollectionsScreen from '../../collection/collections.screen';
import CollectionPage from '../../collection/collection-page/collection.page.screen';
import PersonalUserScreen from '../../user-screens/personal-user-screen/personal.user.screen';
import CollectionEditor from '../../collection/collection-editor/collection.editor';

const AppRouter = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="max-w-[1280px] w-full">
                <Routes>
                    <Route path='/auth' element={<AuthScreen />} />

                    <Route element={<ProtectedAdminRoute />} >
                        <Route path='/users' element={<UsersScreen />} />
                    </Route>

                    <Route element={<ProtectedAuthRoute />}>
                        <Route path='/collection-creation' element={<CollectionCreationScreen />} />
                        <Route path='/collection/:id' element={<CollectionPage />} />
                        <Route path='/my-collections' element={<PersonalUserScreen />} />
                        <Route path='/collection-editor' element={<CollectionEditor />} />
                    </Route>

                    <Route path='/collections' element={<CollectionsScreen />} />

                    <Route path='/test' element={<TestScreen />} />

                    <Route path='/' element={<MainScreen />} />
                </Routes>
            </div>
        </div>
    )
}

export default AppRouter;