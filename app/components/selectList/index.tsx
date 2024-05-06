
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './selectList.module.css';

const SelectList = ({ singleSelections, setSingleSelections , multiSelect, type, options }: any) => {
   
   
    return (
        <>
            <div  className="modal fade h-70" id={"staticBackdrop"+type} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg modal-dialog-centered"    >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Select or create a new {type}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          
                                <Form.Group>
                                    <Form.Label>Select {type}</Form.Label>
                                    
                                    {multiSelect == true ? 
                                    <Typeahead
                                    multiple
                                    id={type}
                                    labelKey="name"
                                    onChange={setSingleSelections}
                                    options={options}
                                    placeholder="Select one or more .."
                                    selected={singleSelections}
                                    />
                                    :
                                    <Typeahead
                                    id={type}
                                    labelKey="name"
                                    onChange={setSingleSelections}
                                    options={options}
                                    placeholder="Select one ..."
                                    selected={singleSelections}
                                    />
                                
                                    }
                                    

                                </Form.Group>
                          
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" name={"select" + type} className="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+type}>Select {type}</button>
        </>
    );
};

export default SelectList;