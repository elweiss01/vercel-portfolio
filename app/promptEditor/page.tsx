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
    title:'Prompt Editor',
    detailsPath: '/promptEditor/details/',
    primaryKey: '',
    type: 'seq',
    module: 'prompts',
    userName: moduleDetails.state.UserName,
    listItemUrl: '/api/prompts/list_prompts',
    createItemUrl: '/api/prompts/create_prompts',
    deleteItemUrl: '/api/prompts/delete_prompts',
    deleteItemBulkUrl: 'api/prompts/delete_prompts_bulk',
    modifyItemUrl: '/api/prompts/modify_prompts/',
    items: []
  }

  const fetchData = async () => {
    fetch(globals.listItemUrl + '/' + globals.type)
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