"use client"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import SearchPage from "../components/searchPage"
import { useContext, useEffect } from 'react';
import { PageDispatch, PageContext } from '@/app/components/globalContext';
import PageGlobals from "../models/pageGlobals";

export default withPageAuthRequired(function Page() {


  const moduleDetails: any = useContext(PageContext)
  const setModuleDetails: any = useContext(PageDispatch)

  const globals: PageGlobals = {
    title:'Sequential Chain Creator',
    detailsPath: '/sequentialChainCreator/details/',
    primaryKey: 'name',
    module: 'chains',
    userName: moduleDetails.state.UserName,
    listItemUrl: '/api/chains/list_chains',
    getItemUrl: '/api/chains/get_chains',
    createItemUrl: '/api/chains/create_chains',
    deleteItemUrl: '/api/chains/delete_chains',
    deleteItemBulkUrl: 'api/chains/delete_chains_bulk',
    modifyItemUrl: '/api/chains/modify_chains/',
    items: []
  }
 
  const fetchData = async () => {
    fetch(globals.listItemUrl!)
      .then((res) => res.json())
      .then((data: []) => {
        globals.items = [...data]
        setModuleDetails.setState({ ...globals })
      })
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <SearchPage />
    </>
  )
})