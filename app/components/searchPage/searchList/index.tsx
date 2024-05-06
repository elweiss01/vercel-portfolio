import Link from "next/link"
import PageGlobals from '@/app/models/pageGlobals'
import { GetGlobalParameters } from "@/app/lib/utils/getGlobals";
import { CirclesWithBar } from 'react-loader-spinner'

const SearchList = ({select, setSelected }: any) => {
    
    const global:PageGlobals = GetGlobalParameters();
   
    const selectItems = (event: any) => {
        
        if (event.target.checked == true) {
             setSelected((select:any) => [...select, (global.module == 'chains' ? event.target.parentElement.dataset.id : event.target.parentElement.htmlFor)])
        } else {
            setSelected(select.filter((x: any) => x != event.target.parentElement.htmlFor));
        }
    }
       
    return (
        <>
        <ul className="list-group p-0">
            {global.items !== undefined ? global.items.map((item: any, idx: number) => (
                
                <li key={idx} className="list-group-item">
                    <label data-id={item.id} htmlFor={global.primaryKey !== "" ? item[global.primaryKey!] : item}><input type="checkbox"  onChange={(e) => selectItems(e)} />  {global.primaryKey !== "" ? item[global.primaryKey!] : item} </label>
                    {global.module !== 'chains' ?
                        <Link href={global.detailsPath + (global.primaryKey !== "" ? item[global.primaryKey!] : item)} className="float-right" >Edit</Link> :
                        <Link href={global.detailsPath + item.id} className="float-right" >Edit</Link> 
                    }
                </li>
            ))
            :
            <span className="h-100 d-flex align-items-center justify-content-center">
                <CirclesWithBar
            height="150"
            width="150"
            color="#0d6efd"
            outerCircleColor="#0d6efd"
            innerCircleColor="#0d6efd"
            barColor="#0d6efd"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            /></span>
            }
            
        </ul>
        </>
    )
}

export default SearchList;