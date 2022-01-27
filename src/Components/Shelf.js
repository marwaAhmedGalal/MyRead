import React from "react";
import Book from "./Book";
import propTypes from 'prop-types'

function Shelf(props) {
    return (
        <>
            {props.Shelfs.map((shelf, index) => (
                <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title" key={shelf.aqiname}>{shelf.name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {shelf.books.map((book, index) => (
                                <Book
                                    key={index}
                                    books={book}
                                    shelfOptions={props.shelfOptions}
                                    updateShelf={props.updateShelf}
                                >
                                </Book>
                            ))}
                        </ol>
                    </div>
                </div>

            ))
            }
        </>
    )
}


Shelf.propTypes = {
    Shelfs:propTypes.array,
    books:propTypes.array,
    shelfOptions:propTypes.array,
    updateShelf:propTypes.func
  };

export default Shelf