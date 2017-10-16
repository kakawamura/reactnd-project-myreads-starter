import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeSearchInput: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { books, onChangeSearchInput, onChangeShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(e) => onChangeSearchInput(e.target.value)}
              type="text"
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => {
              return <Book 
                key={book.id}
                book={book}
                onChangeShelf={onChangeShelf}/>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
