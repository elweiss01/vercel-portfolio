"use client"
import SearchPage from "../components/searchPage"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, createContext, useContext } from 'react';
import { PageDispatch, PageContext } from '@/app/components/globalContext';
import PageGlobals from "../models/pageGlobals";

export default withPageAuthRequired(function Page() {
  
  const moduleDetails:any = useContext(PageContext) 
  const setModuleDetails:any = useContext(PageDispatch)

  const globals:PageGlobals =  {
    title:'Users',
    detailsPath:'/manageUsers/details/',
    primaryKey : 'username',
    module: 'users',
    userName: moduleDetails.state.UserName,
    listItemUrl:'/api/users/list_users',
    createItemUrl: '/api/users/create_users',
    deleteItemUrl: '/api/users/delete_users',
    modifyItemUrl: '/api/users/modify_users/',
    items:[]
  }
  
  useEffect(() => {
    fetch(globals.listItemUrl!)
      .then((res) => res.json())
      .then((data:[]) => {
        globals.items = [...data] 
        setModuleDetails.setState({...globals})
      })
  }, [])


  return (
    <>
        <SearchPage />
    </>
  )
})