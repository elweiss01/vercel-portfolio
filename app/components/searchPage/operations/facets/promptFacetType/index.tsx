import { useContext } from "react";
import { PageContext, PageDispatch } from "@/app/components/globalContext";
import { useEffect } from "react";

const PromptTypeFacet = () => {

    const moduleDetails:any = useContext(PageContext);
    const setModuleDetails:any = useContext(PageDispatch)
    const globals = moduleDetails.state;

    const setType = (value:any) => {
        
        globals.type = value,
        setModuleDetails.setState({...globals})
        fetchData();
       
    }

    const fetchData = async () => {
        fetch(globals.listItemUrl + '/' + globals.type)
          .then((res) => res.json())
          .then((data: []) => {
            globals.items = [...data]
            setModuleDetails.setState({ ...globals })
          })
      }
    
     
    return (
        <>
            <select className="form-select" value={globals.type} onChange={(e) => {setType(e.target.value)}} aria-label=".form-select-sm example">
                <option value="" disabled>Select Prompt Type</option>
                <option value="seq">Seq</option>
                <option value="rag">RAG</option>
                <option value="all">All</option>
            </select>
        </>
    );
}

export default PromptTypeFacet;