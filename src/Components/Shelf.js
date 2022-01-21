import React from "react";
import Book from "./Book";

function Shelf (props){
    return(
        <>
        {props.Shelfs.map((shelf, index)=>(
            <div className="bookshelf" key={index}>
                <h2 className="bookshelf-title" key={shelf.aqiname}>{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <Book books={shelf.books} shelf={shelf} shelfOptions={props.shelfOptions}/>
                    </ol>
                </div>
            </div>

        ))
        }
        </>
    )
}

export default Shelf