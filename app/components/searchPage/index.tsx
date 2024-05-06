import { useState, useContext } from "react";
import { PageContext } from "../globalContext";
import SearchInput from "./searchInput";
import SearchToolBar from "./searchToolBar";
import SearchList from "./searchList";
import styles from "./searchPage.module.css"

const SearchPage = () => {
 
    const [select, setSelect] = useState([]);
    const moduleDetails:any = useContext(PageContext);
    const globals = moduleDetails.state;
   
    return (
        <>
            <div className="container">
                <div className={"row " + styles.searchHeader}>
                    <h1 className="display-4 p-0">{globals.title}</h1>
                    <nav className="navbar navbar-light p-0">
                        <div className="container-fluid p-0">
                            <SearchInput />
                            <SearchToolBar selection={select} />
                        </div>

                    </nav>
                </div>
                <div className={"row p-0 " + styles.view}>
                    <SearchList setSelected={setSelect} select={select} />
                </div>
            </div>
        </>
    )
}

export default SearchPage;