import React from "react";
import { HiBars4 } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

function ListSort({ listItems, setListItems, panels, name }: any) {


  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);


  const handleSort = () => {

    let _listItems = [...listItems];

    const draggedItemContent = _listItems.splice(dragItem.current, 1)[0];

    _listItems.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setListItems(_listItems);
  };

  const handleDelete = (item: number) => {
    let _listItems = [...listItems]

    _listItems.splice(item, 1);

    setListItems(_listItems);

  }


  return (


    <div>
      {panels == false ?

        <ul className="list-group list-group-flush card w-100">
          {listItems.map((item: any, index: any) => (
            <li
              role="button"
              key={index}
              className="list-group-item"
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <HiBars4 className="float-left mt-2" />
              <h3 className="m-1 mt-2 float-left">{item}</h3>
              <Link className="float-right mt-2 p-2 pt-0" href={"/promptEditor/details/" + item}>Edit</Link>
              <TiDelete onClick={() => handleDelete(index)} className="float-right mt-1" size={30} />
            </li>

          ))}
        </ul>
        :
        <div className="accordion" id={"accordion" + name}>
          {
            listItems.map((item: any, index: any) => (
              <div key={index}>
             
                <div className="accordion-item" key={index}>
                  
                  <h4 className="accordion-header" id={"headingOne" + name + index}>
                  
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + name + index} aria-expanded="true" aria-controls={"collapseOne" + name +index}>
                    <TiDelete onClick={() => handleDelete(index)} className="float-left" size={30} />
                      {item.name}
                     
                    </button>
                  </h4>
                  <div id={"collapseOne" + name + index} className="accordion-collapse collapse" aria-labelledby={"headingOne"+ name + index} data-bs-parent={"#accordion"+ name + index}>
                  <div className="accordion-body p-0">
                    <table className="table m-0">
                      <tbody>
                        <tr>
                          <td className="table-active w-50  text-center">
                            {item.description}
                          </td>
                          <td className="p-1">
                            {item.Prompt}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                 
                  </div>
                  </div>
                             
            </div>))}

              </div>
      }
        </div>
  );
}

      export default ListSort;