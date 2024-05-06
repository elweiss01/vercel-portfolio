"use client"
import Form from 'react-bootstrap/Form';
import TagInput from "../../../components/tagInput";
import Prompt from '../../../models/prompt'
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { fetchRedirect } from '@/app/lib/utils/fetchRedirect';
import { GetGlobalParameters } from '@/app/lib/utils/getGlobals';
import { FormEvent } from 'react';
import { fetchDeleteItem, fetchDeleteItems } from '@/app/lib/utils/fetchDelete';
import PageGlobals from '@/app/models/pageGlobals';



const PromptDetails = ({ getPrompt, promptName}: any) => {
 
  const isNew = getPrompt == undefined ? true : false;
  const globals:PageGlobals = GetGlobalParameters();

  const saveData = async (event:FormEvent) => {
    event.preventDefault();
    let getData: any = event;
    
    //get input tags
    const getInputTags:any = document.getElementById('inputTags')
    const inputTags:any = getInputTags.querySelectorAll(".ReactTags__tag");

    //get type
    const getTypes:any = document.querySelector('input[name="type"]:checked')
    const types:any = (isNew == true ? getTypes.value:globals.type)

    //get partial tags
    const getPartialTags:any = document.getElementById('partialTags')
    const partialTags:any = getPartialTags.querySelectorAll(".ReactTags__tag");

    let promptPayload: Prompt = {
      type:types,
      name: getData.target.name.value,
      input_variables:[...inputTags].map((element:any) => {return element.textContent.slice(0,-1)}),
      partial_variables:[...partialTags].map((element:any) => {return element.textContent.slice(0,-1)}),
      prompt: getData.target.promptContent.value,
      template: getData.target.promptContent.value
    }

    await fetchRedirect((!isNew ? '/api/prompts/modify_prompts/': '/api/prompts/create_prompts'),  JSON.stringify(promptPayload))
  }

  const deletePrompt = async () => {
    await fetchDeleteItem('/api/prompts/delete_prompts',"/promptEditor",promptName)
  }

return (
  <div className="container">
    <div className="row pt-4 pb-4">
      <div className="col-10">
        <h1 className="display-4">
          <div onClick={() => history.back()} >
            <IoMdArrowRoundBack size={50} className="float-left mr-2 p-2" />
          </div> {!isNew ?  'Prompt Editor Details - ' + promptName : 'Create a new prompt'}  </h1></div>

    </div>
    <div className="row" >
      <div className="col">
        <Form id='prompt' onSubmit={(e) => saveData(e)}>
          <Form.Group className="">
            <Form.Label className="form-check-label" htmlFor='name' >Name</Form.Label>
            <input type="text" className="form-control" name='name' defaultValue={!isNew ? promptName.split('-')[1].replace('.yml','') : ''} disabled={!getPrompt == undefined ? true : false} />
          </Form.Group>
          {!getPrompt ? <Form.Group className="pt-2 pb-2 ">
            <Form.Label>Prompt Type</Form.Label>
            <Form.Group>
              <Form.Check inline label="RAG" name="type" type="radio" id="1" defaultValue='rag' defaultChecked={true} />
              <Form.Check inline label="Sequential Prompts" name="type" defaultValue='seq' type="radio" id="2" />
            </Form.Group>
          </Form.Group> : <></>}
          <Form.Group id="inputTags" className="pt-2 pb-2">
            <Form.Label>Prompt Variables</Form.Label>
            <TagInput  inputVariables={!getPrompt ? [] : getPrompt.input_variables} inputName={'input'} />
          </Form.Group>
          <Form.Group id="partialTags" className="pt-2 pb-2">
            <Form.Label>Partial Variables</Form.Label>
            <TagInput  inputVariables={!getPrompt ? [] : getPrompt.partial_variables} inputName={'partial'} />
          </Form.Group>
          <Form.Group className="pt-4">
            <textarea name="promptContent" rows={16} cols={40} defaultValue={getPrompt ? getPrompt.template || getPrompt.prompt : ''} />
          </Form.Group>
          <div className="pt-4">
            {!isNew && <button type="submit" id="save" className="btn btn-primary mr-2" >Save</button>}
            {isNew && <button type="submit" id="save" className="btn btn-primary mr-2" >Create</button>}
            {!isNew && <button type="button" className="btn btn-danger mr-2" data-bs-toggle="modal" data-bs-target="#target">Delete</button>}
          </div>

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
                  <button type="button" className="btn btn-danger" onClick={deletePrompt}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </Form>

      </div>
    </div>
  </div>

)
}

export default PromptDetails;