import NewOperator from "../operations/new";
import DeleteOperator from "../operations/delete";
import PromptTypeFacet from "../operations/facets/promptFacetType";
import { useContext } from "react";
import { PageContext } from "../../globalContext";

const SearchToolBar = ({ selection}: any) => {

    const moduleDetails:any = useContext(PageContext);
    const globals:any = moduleDetails.state
  
    return (
        <>        
        <span className="d-flex">
            {globals.module == 'prompts' ? <PromptTypeFacet /> : <></>}
            <NewOperator />
            <DeleteOperator selected={selection} />
        </span>
        </>

    )
}

export default SearchToolBar;