import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BookCard from './BookCard.jsx';
import { map } from 'lodash';
import { v4 } from 'uuid';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver && 'rgb(209, 209, 209,0.5)',
  minWidth: '100%',
  minHeight: '100%'
});

const BooksColumn = ({ books, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {
            map(books, (book, index) => {
              return (
                <BookCard
                  key={v4()}
                  index={index}
                  book={book}
                  id={id}
                />
              )
            })
          }
        </div>
      )}
    </Droppable>
  )
}

export default BooksColumn;