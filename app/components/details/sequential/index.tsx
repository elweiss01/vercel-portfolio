"use client";
import SelectList from "../../selectList";
import { useState, useEffect, FormEvent } from "react";
import ListSort from "../../listSort";
import SaveDelete from "../../saveDelete";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Sequential from "@/app/models/sequential";
import { fetchRedirect } from "@/app/lib/utils/fetchRedirect";
import { fetchDeleteItem } from "@/app/lib/utils/fetchDelete";

const SequentialDetails = ({ sequential }: any) => {

  const [prompt, setPrompt] = useState<string[]>((sequential !== undefined ? sequential.sequence : []));
  const [optionalPrompt, setOptionalPrompt] = useState<string[]>([])

  
  const fetchData = async () => {
    await fetch('/api/prompts/list_prompts/all')
      .then((res) => res.json())
      .then((data: []) => {
        setOptionalPrompt(data)
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

const saveData = async (event:FormEvent) => {
  event.preventDefault();
  
  let getData: any = document.getElementById('sequence');
  console.log(getData)

  let getTypes:any = document.querySelector('input[name="chainType"]:checked')
  const types:any = (sequential == undefined ? getTypes.value : sequential.type)

  let sequentialPayload:Sequential = {
    ...(sequential !== undefined ? {id:sequential.id} : {}),
    type: types,
    description: getData.description.value,
    name: getData.name.value,
    sequence:prompt
  }

  await fetchRedirect(( sequential !== undefined  ? '/api/chains/modify_chains' : '/api/chains/create_chains'), JSON.stringify(sequentialPayload))
}

const deleteChain = async () => {
  await fetchDeleteItem('/api/chains/delete_chains','/sequentialChainCreator', sequential.id)
}


  return (

    <div className="container">
      <form id="sequence">
      <div className="row pt-4 pb-4">
        <div className="col-10"><h1 className="display-4">
          <Link href="/sequentialChainCreator" >
            <IoMdArrowRoundBack size={50} className="float-left mr-2 p-2" />
          </Link> Sequential Chain Details - {sequential !== undefined ? sequential.name : 'New Chain'}
          {sequential !== undefined ? <span className="badge bg-secondary ml-2">{sequential.type === 'sim' ? 'Simple Chain' : 'Adversarial'}</span> : <></>}</h1></div>
      </div>

      <div className="row">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" defaultValue={sequential !== undefined ? sequential.name : ""} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows={3} defaultValue={sequential !== undefined ? sequential.description : ""} />
        </div>
        {sequential == undefined ?
          <div className="mb-3">
            <label className="form-label">Sequential Type</label>
            <div className="mb-2 ml-2">
              <label htmlFor="Simple"> Simple <input type="radio" name="chainType" value="sim" defaultChecked={true} /></label><br />
              <label htmlFor="Adversarial"> Adversarial <input type="radio" name="chainType" value="adv" /></label>
            </div>
          </div> : <></>}
      </div>
      <div className="row">
        <div className="col-10">
          <h3 className="pb-2">Prompt Order</h3>
          <ListSort listItems={prompt} setListItems={setPrompt} panels={false} />
        </div>
        <div className="col-2 mb-3">
          <SelectList singleSelections={prompt} setSingleSelections={setPrompt} multiSelect={true} type="Prompt" options={optionalPrompt} />
        </div>
      </div>
      <div className="pt-4">
      {sequential !== undefined && <button type="submit" name="save" onClick={(e) => saveData(e)} id="save" className="btn btn-primary mr-2" >Save</button>}
       {sequential == undefined && <button type="submit" name="create" onClick={(e) => saveData(e)} id="create" className="btn btn-primary mr-2" >Create</button>}
       {sequential !== undefined && <button type="button" name="delete" className="btn btn-danger mr-2" data-bs-toggle="modal" data-bs-target="#target">Delete</button>}
      </div>
      </form>
      <div className="modal fade" id="target" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="target" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to Delete?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => deleteChain() } className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequentialDetails;