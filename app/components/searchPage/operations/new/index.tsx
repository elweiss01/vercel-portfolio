import { MdFiberNew } from "react-icons/md";
import Link from "next/link";
import { PageContext } from '@/app/components/globalContext'
import { useContext } from 'react';

const NewOperator = () => {

    const moduleDetails:any = useContext(PageContext);
    const globals = moduleDetails.state;

    return (
        <>
            <Link className="pt-2 p-2 pb-1" href={globals.detailsPath+'create-new'} ><MdFiberNew className="ml-2" size={25} /></Link>
            
        </>
    )
}

export default NewOperator;