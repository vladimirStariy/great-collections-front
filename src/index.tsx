import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './i18n';
import './index.css';

import Layout from './components/layout/layout';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const store = setupStore();
const persistor = persistStore(store); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading language...</div>}>
            <Layout />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
);
