import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AppRouter } from './components/AppRouter';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}


