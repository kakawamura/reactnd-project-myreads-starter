import React from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import BookShelfList from './BookShelfList'
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
        const searchedBooks = res.map(r => {
          const book = this.state.books.find(b => { 
            return b.id === r.id 
          })
          if(book) {
            return book
          }

          return r
        })

        this.setState({
          searchedBooks,
        })
      })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <Search 
            books={this.state.searchedBooks}
            onChangeSearchInput={this.onChangeSearchInput}
            onChangeShelf={this.onChangeShelf}
          />
        }>
        </Route>
        <Route exact path="/" render={() =>
          <BookShelfList
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
          />
        }>
        </Route>
      </div>
    )
  }
}

export default BooksApp
