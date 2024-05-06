import { useState } from "react";
import User from "@/app/models/user";

const SaveDelete = ({newItem, recordItem, form, module}:any) => {
    
    const saveData = () => {
      let payload:any = []
      let getData:any = document.getElementById(form);

      let newUserData:User = {
        username: recordItem.username,
        email: getData.email.value,
        password: getData.confirmPassword.value
      }

      payload.push(newUserData);

      fetch(process.env.HOST_URL+'/api/'+module+'/modify_'+module, {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      }).catch((error) => {
        console.log(JSON.stringify(error))
      })

      return false;
    }

    const deleteData = async (username:string) => {
      let payload:any = {"username":username}
      
      await fetch(process.env.HOST_URL+'/api/'+module+'/delete_'+module, {
        method: 'DELETE',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      }).catch((error:any) => {
        console.log(JSON.stringify(error))
      })

      window.location.replace('/manageUsers')
      return false;
    }

    const createData = async (e:any) => {
    
      
      let payload:any = []
      let getData:any = document.getElementById(form);
      console.log(getData)

      let newUserData:User = {
        username: getData.userName.value,
        email: getData.email.value,
        password: getData.password.value
      }

      payload.push(newUserData);

      await fetch(process.env.HOST_URL+'/api/'+module+'/create_'+module, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": 'localhost:3000'
          
        },
        body:JSON.stringify(payload)
      }).catch((error:any) => {
        console.log(JSON.stringify(error))
      })

      window.location.replace('/manageUsers')
      return false;
    }

    

    return (
      <>
      <div className="pt-4">
              {!newItem && <button type="submit" onClick={() => saveData()} id="save" className="btn btn-primary mr-2" >Save</button>}
              {newItem && <button type="submit" onClick={(e) => createData(e)} id="save" className="btn btn-primary mr-2" >Create</button>}
              {!newItem && <button type="button" className="btn btn-danger mr-2" data-bs-toggle="modal" data-bs-target="#target">Delete</button>}
              {newItem && <button  type="button" className="btn btn-secondary">Reset</button>}
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
              <button type="button" onClick={() => deleteData(recordItem.username) } className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>


      </>
    )
}

export default SaveDelete;