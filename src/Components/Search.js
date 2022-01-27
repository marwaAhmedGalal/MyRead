import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import propTypes from 'prop-types'
class Search extends Component {
    state = {
        query: '',
        searchresult: []
    }


    updateQuery = (query) => {
        this.setState(() => ({
            query
        }))
        if (query === "") {
            this.setState(() => ({
                searchresult: []
            }))
        } else {
            BooksAPI.search(query.trim())
                .then((searchresult) => {
                    //update book shelf in search result 
                    searchresult.map((book) => {
                        const bookIndex = this.props.books.findIndex((b) => b.id === book.id);
                        if (bookIndex !== -1) {
                            book.shelf = this.props.books[bookIndex].shelf
                        }
                    })
                    this.setState(() => ({
                        searchresult
                    }))
                })
        }
    }


    render() {
        return (

            <div className="search-books">

                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search" >Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {this.state.searchresult.length > 0 ? this.state.searchresult.map((book, index) => (
                            <Book
                                Key={index}
                                shelfOptions={this.props.shelfOptions}
                                updateShelf={this.props.updateShelf}
                                books={book} />
                        )) : "No Matched books"}

                    </ol>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    books:propTypes.array,
    shelfOptions:propTypes.array,
    updateShelf:propTypes.func
  };

export default Search