import React from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';


const TagInput = ({inputVariables, inputName}:any) => {
  
    let variableSet:any[] = (inputVariables !== 0 ||inputVariables == undefined ? inputVariables?.map((item:any, idx:any) => ({
        id:item, text:item
    })) : []) 

    
    const [tags, setTags] = React.useState<any[]>(variableSet !== undefined ? variableSet.filter((x) => {return x.id !=''}) : []);

    
    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    
    const handleDelete = (i: any) => {
        setTags(tags.filter((tag:any, index:any) => index !== i));
    };

    const handleAddition = (tag: any) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag: any, currPos: any, newPos: any) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    return (
        <>
            <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
                name={inputName}
                
            />
        </>
    );
}

export default TagInput;