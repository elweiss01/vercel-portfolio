import { FaTrashAlt } from "react-icons/fa";
import { fetchDeleteItem } from "@/app/lib/utils/fetchDelete";
import { GetGlobalParameters } from "@/app/lib/utils/getGlobals";
import PageGlobals from "@/app/models/pageGlobals"



const DeleteOperator = ({selected}:any) => {
    
    const globals: PageGlobals = GetGlobalParameters();

    const deleteOperation = async () => {
        selected.forEach((item:any) => {
            deleteEach(item)
        });
        
    }

    const deleteEach = async (item:any) =>{
        await fetchDeleteItem(globals.deleteItemUrl!,'',item)
    }
        
   

    return (
        <>
         <button data-bs-toggle="modal" data-bs-target="#DeleteOperatorModal"  disabled={selected.length == 0 ? true : false} ><FaTrashAlt color={selected.length == 0? 'gray' : 'black'} className="ml-2" size={20}/></button>
         <div className="modal fade" id="DeleteOperatorModal" tabIndex={-1} aria-labelledby="DeleteOperatorLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="DeleteOperatorLabel">Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        Are you sure you want to delete? Once this operation is done, there is no way to recover the item(s).
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={deleteOperation} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteOperator;