import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context';

// create root
const root = ReactDOM.createRoot(document.querySelector('#root'));

// init render
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
