import React, {useState, createContext, useEffect, useContext} from 'react';
import { BrowserRouter } from "react-router-dom";
import { UserRoutes } from "./components/UserRoutes";

import './App.css';
import {verifyToken} from "./api/verifyToken";
import {Loader} from "./components/Loader";

const TOKEN_KEY = 'auth_token';

const initialStore = {
    user: null,
    loading: true
}

export const StoreContext = createContext(initialStore);

export const useStore = () => useContext(StoreContext);

function App() {
  const [ store, setStore ] = useState(initialStore);
  const setLoading = (isLoading) => {
      setStore(prev => ({
          ...prev,
          loading: isLoading
      }));
  }
  const setUser = (user = null) => {
      setStore(prev => ({
          ...prev,
          user
      }));
  }
  const authorize = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if(!token) {
          setLoading(false)
          return;
      }
      return verifyToken()
          .then(user => {
              if(user?.id) {
                  setUser(user)
              } else {
                  localStorage.removeItem(TOKEN_KEY);
              }
          })
          .finally(() => {
              setLoading(false)
          })
  }
  useEffect(() => {
      authorize();
  }, [ localStorage[TOKEN_KEY] ]);
  if(store.loading) {
      return <Loader />;
  }
  return (
      <StoreContext.Provider value={{
          store,
          authorize,
          update: setStore,
      }}>
          <BrowserRouter>
              <UserRoutes />
          </BrowserRouter>
      </StoreContext.Provider>
  );
}

export default App;