import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'

class BookShelf extends React.Component {

  render() {
    const { title, books, onChangeShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={onChangeShelf}
                />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.protTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default BookShelf
