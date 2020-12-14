import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import { Context } from '../store.jsx';
import { ContextMenuTrigger } from 'react-contextmenu';
import BookCardContextMenu from './BookCardContextMenu.jsx';
import BookDetailsModal from './BookDetailsModal.jsx';
import nopic from '../images/nopic.png';
import { truncate, map } from 'lodash';
import '../styles/BookCard.css';


const BookCard = ({ book, index, id }) => {
  const [state, dispatch] = useContext(Context);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { authors, categories, description, imageLinks, title } = book.volumeInfo;

  const handleDragDisable = () => {
    let ids = map(state.favouriteBooksList, ({ id }) => (id));
    if (id === 'booksList') {
      return ids.includes(book.id)
    }
  }

  const handleBookDetailsModal = () => {
    setModalIsOpen((prevValue) => !prevValue);
  }

  return (
    <div id='BookCard-Container'>
      <ContextMenuTrigger
        key={`${book.id}-${id}-ContextMenu-key`}
        id={`${book.id}-${id}-ContextMenu`}
        holdToDisplay={-1}
      >
        <Draggable
          draggableId={`${book.id}-${id}`}
          index={index}
          isDragDisabled={handleDragDisable()}
        >
          {(provided/* , snapshot */) => (
            <div
              id={`col-d1-${index}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className='BookCard-Container'>
                <div className='BookCard-Row'>
                  <div className='BookCard-Image'>
                    <img
                      src={imageLinks ?
                        imageLinks.thumbnail
                        : nopic}
                      alt={title}
                    />
                  </div>
                  <div className='BookCard-Header'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2>
                        <i>
                          <b>{title ? title : 'No title'}</b>
                        </i>
                      </h2>
                      {id === 'favouriteBooksList' &&
                        <Button
                          color='danger'
                          outline
                          onClick={() => dispatch({ type: 'REMOVE_FAVOURITE_BOOK', payload: book })}
                        >
                          <i className="far fa-trash-alt"></i>
                        </Button>
                      }
                    </div>
                    <h3>{categories ? categories.join(", ") : 'No categories'}</h3>
                    <h4>
                      <i>{authors ? authors.join(", ") : 'No authors'}</i>
                    </h4>
                  </div>
                </div>
                <div div className='BookCard-Row'>
                  <h5>
                    <b>Description:</b>
                  </h5>
                  {description ?
                    truncate(
                      description.replace(/['"]+/g, ''), {
                      'length': 300,
                      'separator': /,? +/
                    }) : ' '
                  }
                </div>
                <div div className='BookCard-Row'>
                  <h5>
                    <b>{'Too see more details please click right mouse button!'}</b>
                  </h5>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </ContextMenuTrigger>
      <BookCardContextMenu
        id={`${book.id}-${id}-ContextMenu`}
        handleBookDetailsModal={handleBookDetailsModal}
      />
      {modalIsOpen &&
        <BookDetailsModal
          book={book}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      }
    </div>
  );
};

export default BookCard;


