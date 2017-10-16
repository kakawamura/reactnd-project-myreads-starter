import React from 'react'
import { Route, Link } from 'react-router-dom'
import Book from './Book'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    searchedBooks: [],
  }

  componentWillMount() {
    BooksAPI
      .getAll()
      .then(res => {
        this.setState({
          books: res
        })
      })
  }

  onChangeShelf = (shelf, book) => {
    book.shelf = shelf
    BooksAPI
      .update(book, shelf)
      .then(res => {
        this.setState((state) => {
          let books = state.books.filter((b) => b.id !== book.id)
          books = books.concat([book])  
          return {
            books,
          }
        })
      })
  }

  onChangeSearchInput = (value) => {
    if(!value)
      return
    BooksAPI
      .search(value, 20)
      .then(res => {
        if(res.error) {
          return
        }
        this.setState({
          searchedBooks: res,
        })
      })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  onChange={(e) => this.onChangeSearchInput(e.target.value)}
                  type="text"
                  placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks.map(book => {
                  return <Book 
                    key={book.id}
                    book={book}
                    onChangeShelf={this.onChangeShelf}/>
                })}
              </ol>
            </div>
          </div>
        }>
        </Route>
        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={this.state.books.filter(b => b.shelf === "currentlyReading")}
                  onChangeShelf={this.onChangeShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={this.state.books.filter(b => b.shelf === "wantToRead")}
                  onChangeShelf={this.onChangeShelf}
                />
                <BookShelf
                  title="Read"
                  books={this.state.books.filter(b => b.shelf === "read")}
                  onChangeShelf={this.onChangeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }>
        </Route>
      </div>
    )
  }
}

export default BooksApp
