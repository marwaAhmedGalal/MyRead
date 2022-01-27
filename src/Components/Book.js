import React from 'react'
import ShelfOption from './shelfOption'
function Book(props) {
  let books = props.books
  return (


    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ((props.books.imageLinks && props.books.imageLinks.smallThumbnail) ? `url(${books.imageLinks.thumbnail})` : "none") }}></div>
          <div className="book-shelf-changer">
            <ShelfOption 
              shelf={books.shelf}
              books={books}
              shelfOptions={props.shelfOptions}
              updateShelf={props.updateShelf}
              id={books.id} />
          </div>
        </div>
        <div className="book-title">{books.title}</div>
        <div className="book-authors">{books.authors ? books.authors.map((author, index) => (<p key={index}>{author} </p>)) : ""}</div>
      </div>
    </li>


  )
}

export default Book