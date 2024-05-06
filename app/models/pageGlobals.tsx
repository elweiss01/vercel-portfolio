interface PageGlobals {
    type?:string
    title?:string,
    module?: string,
    primaryKey?: string,
    detailsPath?: string,
    listItemUrl?: string,
    getItemUrl?: string,
    createItemUrl?:string
    modifyItemUrl?:string,
    deleteItemUrl?:string,
    deleteItemBulkUrl?:string,
    items?: Array<string>,
    userName?: string,
    email?:string
}

export default PageGlobals;