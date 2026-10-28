import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider value={{ appTitle: 'Photo Gallery' }}>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
