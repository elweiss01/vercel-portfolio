import { useContext } from 'react';
import { PageContext } from '@/app/components/globalContext/index';

const GetGlobalParameters = () => {
    const moduleDetails: any = useContext(PageContext)
    const globalParamters = moduleDetails.state;

    return globalParamters;
}

export {GetGlobalParameters}