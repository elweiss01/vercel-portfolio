import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState,useContext } from "react";
import { PageContext, PageDispatch } from "../../globalContext";
import styles from "../searchPage.module.css"

//const SEARCH_URI = 'https://api.github.com/search/users';

const SearchInput = () => {

  const moduleDetails:any = useContext(PageContext);
  const setModuleDetails:any = useContext(PageDispatch) 

  const global:any = moduleDetails.state;

  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState<any>(global.items);

  // const [options, setOptions] = useState<any>([]);


  const handleSearch = (event: any) => {
    //pulls the search by increment here you handle call to api
     setIsLoading(false);

    /*fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(( items ) => {
        setOptions(items.items);
        setIsLoading(false);
        console.log(items.items)
      });*/
  };

  const handleSelection = (value: any) => {

    setReset(global.items)
    
    if (value.length == 1) {
      global.items = value
      setModuleDetails.setState({...global})
    } else {
      global.items = reset
      setModuleDetails.setState({...global})
    }

  }


  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => false;

  return (
    <>
      <AsyncTypeahead

        id="async-example"
        isLoading={isLoading}
        labelKey={global.primaryKey}
        minLength={3}
        className={styles.search}
        onSearch={(e) => handleSearch(e)}
        onChange={(value) => handleSelection(value)}
        options={global.items}
        placeholder="Search for an item"
        renderMenuItemChildren={(item: any) => (
          <>
            <span>{global.primaryKey !== ""  ? item[global.primaryKey] : item}</span>
          </>
        )}
      />
    </>
  );
};

export default SearchInput;