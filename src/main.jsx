import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { persistor, store } from './share/data/store/store'
import { Provider } from 'react-redux'
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
