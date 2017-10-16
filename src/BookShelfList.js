import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookShelfList extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { books, onChangeShelf } = this.props
    const list = [
      { key: "currentlyReading", title: "Currently Reading" },
      { key: 'wantToRead', title: "Want to Read" },
      { key: "read", title: "Read" },
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {list.map(l => {
              return <BookShelf
                key={l.key}
                title={l.title}
                books={books.filter(b => b.shelf === l.key)}
                onChangeShelf={onChangeShelf}
              />
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelfList

