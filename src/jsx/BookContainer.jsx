/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import BookFormModal from './BookFormModal.jsx';
import { Button } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { Context } from '../store.jsx';
import { move, reorder } from '../utils/functions.jsx';
import BooksColumn from './BooksColumn.jsx';
import '../styles/BooksContainer.css';

const BookContiner = ({ books, handelPathIndex, pathIndex, onSubmit }) => {
  const [state, dispatch] = useContext(Context);
  const [modalIsOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_BOOKS_LIST', payload: books });
    dispatch({ type: 'SET_FAVOURITE_BOOK', payload: state.favouriteBooksList })
  }, [books]);

  const id2List = {
    booksList: 'booksList',
    favouriteBooksList: 'favouriteBooksList'
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!result.destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      source.droppableId === 'booksList' ?
        dispatch({ type: 'REORDER_BOOKS', payload: items })
        :
        dispatch({ type: 'REORDER_FAVOURITE_BOOK', payload: items })
    } else if (source.droppableId === 'booksList' && destination.droppableId === 'favouriteBooksList') {
      const result = move(
        getList(source.droppableId),
        state.favouriteBooksList,
        source,
        destination
      );
      dispatch({ type: 'ADD_FAVOURITE_BOOK', payload: result.moved })
    } else alert('You can not move book from favourite list into books list!')
  }

  return (
    <div className='BookContainer-Container'>
      <div className='BookContainer-Row'>
        <div className='BookContainer-Column' style={{ backgroundColor: 'transparent' }}>
          <h2 className='BookContainer-Header'>BOOK LIST</h2>
        </div>
        <div className='BookContainer-Column' style={{ backgroundColor: 'transparent' }}>
          <h2 className='BookContainer-Header'>FAVOURITE BOOKS LIST</h2>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='BookContainer-Row'>
          <div className='BookContainer-Column BookContainer-Column-List'>
            <BooksColumn books={state.booksList} id="booksList" />
          </div>
          <div className='BookContainer-Column BookContainer-Column-List'>
            <BooksColumn books={state.favouriteBooksList} id="favouriteBooksList" />
          </div>
        </div>
      </DragDropContext>
      <div className='BookContainer-Row'>
        <div className='BookContainer-Column' style={{ backgroundColor: 'transparent' }}>
          <div className='Pagination-Buttons'>
            <Button
              disabled={pathIndex < 10}
              name='back'
              color="warning"
              onClick={(e) => handelPathIndex(e)}
            >
              <i className="fas fa-angle-left" />{' '}
              {'Back'}
            </Button>
            <Button
              id='BookContainer-Button-NewSearch'
              size="xl"
              name='more'
              color="danger"
              onClick={() => setModalOpen((prevValue) => !prevValue)}
            >
              <i className="fas fa-search" />{' '}
              {' New Search'}
            </Button>
            <Button
              disabled={books.length <= 1}
              size="xl"
              name='more'
              color="warning"
              onClick={(e) => handelPathIndex(e)}
            >
              {'More'}{' '}
              <i className="fas fa-angle-right" />
            </Button>
          </div>
        </div>
      </div>
      <div>
      </div>
      {modalIsOpen &&
        <BookFormModal
          modalIsOpen={modalIsOpen}
          setModalOpen={setModalOpen}
          onSubmit={onSubmit}
        />
      }
    </div>
  )
}

export default BookContiner;