import React from 'react'

function Book (props){

return(
<>
{props.books.map((book)=>(
 <li key={book.title}>
 <div className="book">
   <div className="book-top">
     <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
     <div className="book-shelf-changer">
       <select>
         <option value="move" disabled>Move to...</option>
         {props.shelfOptions.map((option, index)=>(
         <option key={option.index} value={option.key} selected= {(book.shelf === option.key) ? true : false}>{option.name}</option>
         ))}
       </select>
     </div>
   </div>
   <div className="book-title">{book.title}</div>
   <div className="book-authors">{book.authors.map((author)=>(<p key={author.id}>{author}</p>))}</div>
 </div>
</li>
))}
</>
   
)
}

export default Book