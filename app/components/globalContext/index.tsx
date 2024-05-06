"use client"
import { useState, createContext } from 'react';
import PageGlobals from '@/app/models/pageGlobals';

const PageContext = createContext({});
const PageDispatch = createContext({})

const PageProvider = ({ children }:any) =>  {
 
  
  const [state, setState] = useState<PageGlobals>({})
  
  return (
    <PageContext.Provider value={{ state }}>
      <PageDispatch.Provider value={{ setState }}>
        <>{children}</>
      </PageDispatch.Provider>
    </PageContext.Provider>
  );
};

export { PageContext, PageDispatch, PageProvider };