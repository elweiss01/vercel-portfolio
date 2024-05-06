

import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import User from "@/app/models/user";
import { PageContext } from "../../globalContext";
import { useContext } from "react";

const UserDetails = ({ userName, record }: any) => {

    const moduleDetails:any = useContext(PageContext);
    const globals:any = moduleDetails.state;

    const isNew = record.username == '' ? true : false;
   
    const validatePassword = () => {
        const password: any = document.querySelector('input[name=changedPassword]');
        const confirm: any = document.querySelector('input[name=confirmPassword]');

        if (confirm.value === password.value) {
            confirm.setCustomValidity('');
        } else {
            confirm.setCustomValidity('Passwords do not match');
        }
    }

    const saveData = async () => {
  
       
        let getData:any = document.getElementById('user');
            
       let newUserData: User = {
            uuid: "string",
            username: getData.userName.value,
            email: getData.email.value,
            password:getData.confirmPassword.value
        }

       

        if(isNew){
            await fetch( globals.createItemUrl, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
    
                },
                body: JSON.stringify(newUserData)
            }).then((res:any) => {
                if(res.ok) {
                    window.location.replace('/manageUsers')
                }
            }).catch((error: any) => {
                console.log(JSON.stringify(error))
            })

        } else {
            
            let modifiedUserData:any = {
                email: getData.email.value,
                password:getData.confirmPassword.value
            }
            fetch(globals.modifyItemUrl + newUserData.username, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modifiedUserData)
            }).then((res:any) => {
                if(res.ok) {
                    window.location.replace('/manageUsers')
                }
            }).catch((error) => {
                console.log(JSON.stringify(error))
            })
            
        }

       
    }

    const deleteData = async (username: string) => {
        let payload: any = { "username": username }

        await fetch(globals.deleteItemUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((res:any) => {
            if(res.ok) {
                window.location.replace('/manageUsers')
                window.location.reload()
            }
        }).catch((error: any) => {
            console.log(JSON.stringify(error))
        })

    }

    return (
        <>
            <div className="row p-2 mt-10">
                <h1>
                    <Link href="/manageUsers" ><IoMdArrowRoundBack size={50} className="float-left mr-2 p-2" /></Link>
                    {record.username == '' ? "Create New User" : "User Details - " + userName}
                </h1>
            </div>
            <div className="row">
                <form id="user" action={saveData}>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input type="userName" className="form-control" id="userName" aria-describedby="userName" defaultValue={record.username} disabled={record.username == '' ? false : true} required={record.username == '' ? true : false} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={record.email}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="changedPassword" className="form-label">Change Password</label>
                        <input type="password" className="form-control" id="changedPassword" name="changedPassword" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={() => { validatePassword() }} required />
                    </div>

                    <div className="pt-4">
                        {!isNew && <button type="submit" id="save" className="btn btn-primary mr-2" >Save</button>}
                        {isNew && <button type="submit"  id="save" className="btn btn-primary mr-2" >Create</button>}
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
                                    <p>Are you sure you want to delete? Once this operation is done, there is no way to recover the item</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={() => deleteData(record.username)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default UserDetails;