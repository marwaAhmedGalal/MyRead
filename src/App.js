import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Components/Shelf'
import Search from './Components/Search'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
  
      */
      books: null,
      bookShelf: [],
      shelfOptions: [],
      flip: true,

      shelfToUpdate: '',
      bookToUpdate: {},

    }

  }

  componentDidMount() {
    this.renderBooks()
  }

  renderBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,

        }))
        this.setState((currentState) => ({
          shelfOptions: [
            {
              key: "currentlyReading",
              name: "Currently Reading"
            },

            {
              key: "wantToRead",
              name: "Want To Read"
            },

            {
              key: "read",
              name: "Read"
            },


            {
              key: "none",
              name: "None"
            }]
        }))
        this.setState((currentState) => ({
          bookShelf: this.state.shelfOptions.filter(shelf => shelf.key !== "none").map((shelf) => (

            {
              apiname: shelf.key,
              name: shelf.name,
              books: this.state.books.filter((read) => (read.shelf === shelf.key))
            }


          ))

        }))

      })
  }

  updateShelf = (shelf, book) => {

    //update all books
    const updatedBooks = this.state.books;
    const bookIndex = this.state.books.findIndex((b) => b.id === book.id);
    if (bookIndex === -1) {

      book.shelf = shelf;
      updatedBooks.push(book);
    } else {
      updatedBooks[bookIndex].shelf = shelf;
    }

    this.setState(() => ({
      books: updatedBooks,
    }))


    //api
    // book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
     window.location.reload()
      this.setState(() => ({
        flip: !this.state.flip
      }))
      this.forceUpdate()

    })

  }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (<Search
          books={this.state.books}
          shelfOptions={this.state.shelfOptions}
          updateShelf={this.updateShelf} />)} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf Shelfs={this.state.bookShelf}
                  shelfOptions={this.state.shelfOptions}
                  books={this.state.books}
                  updateShelf={this.updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/Search'><button>Add a book</button></Link>
            </div>
          </div>

        )
        } />
      </div>
    )
  }
}

export default BooksApp
