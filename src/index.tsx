import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/layout/navbar/navbar';
import AppRouter from './components/layout/router/app.router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <NavigationBar />
    <AppRouter />
  </BrowserRouter>
);
