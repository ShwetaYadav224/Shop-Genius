import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";

import App from './App.jsx';
import './index.css';
import { store } from './redux/store';
import router from './rotues/index.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <ThemeProvider> 
          <App />
        </ThemeProvider>
      </RouterProvider>
    </Provider>
  </StrictMode>,
);
