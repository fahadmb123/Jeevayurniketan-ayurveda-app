import React, { createContext, useContext } from 'react';

export interface InitialLoadContextValue {
  isInitialLoading: boolean;
}

const InitialLoadContext = createContext<InitialLoadContextValue>({
  isInitialLoading: false,
});

export const InitialLoadProvider: React.FC<{
  isInitialLoading: boolean;
  children: React.ReactNode;
}> = ({ isInitialLoading, children }) => {
  return (
    <InitialLoadContext.Provider value={{ isInitialLoading }}>
      {children}
    </InitialLoadContext.Provider>
  );
};

export const useInitialLoading = (): InitialLoadContextValue => useContext(InitialLoadContext);
