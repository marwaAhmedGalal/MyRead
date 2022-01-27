import React from 'react'


function ShelfOption(props) {
    return (

        <select value={props.shelf === undefined ? "none": props.shelf}
            key={props.id}
            id={props.id}
            onChange={(event) => props.updateShelf(event.target.value, props.books)
            } >


            <option value="move" disabled>Move to...</option>
            {props.shelfOptions.map((option, index) => (
                <option
                    key={index}
                    value={(option.key)}
                  >
                    {option.name}
                </option>
            ))}

        </select>
    )
}

export default ShelfOption