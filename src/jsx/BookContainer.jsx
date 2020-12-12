import React, { useContext } from 'react';
import BookCard from './BookCard.jsx';
import { map } from 'lodash';
import { Button } from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Context } from '../store.jsx';
import { move, reorder } from '../utils/functions.jsx';
import '../styles/BooksContainer.css';


export default function BookContiner({ books, handelPathIndex, pathIndex }) {
  const [state, dispatch] = useContext(Context);

  const id2List = {
    beersList: 'listBeers',
    favouriteBeersList: 'favouriteBeers'
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!result.destination) return;

    // if (source.droppableId === destination.droppableId) {
    //   const items = reorder(
    //     getList(source.droppableId),
    //     source.index,
    //     destination.index
    //   );
    //   source.droppableId === 'beersList' ?
    //     dispatch({ type: 'REORDER_BEERS', payload: items })
    //     :
    //     dispatch({ type: 'REORDER_FAVOURITE_BEERS', payload: items })
    // } else if (destination.droppableId === 'removeField') {

    //   source.droppableId === 'beersList' ?
    //     dispatch({ type: 'REMOVE_BEERS', payload: removedItem })
    //     :
    //     dispatch({ type: 'REMOVE_FAVOURITE_BEERS', payload: removedItem });
    // } else if (source.droppableId === 'beersList' && destination.droppableId === 'favouriteBeersList') {
    //   const result = move(
    //     getList(source.droppableId),
    //     state.favouriteBeers,
    //     source,
    //     destination
    //   );
    //   dispatch({ type: 'ADD_FAVOURITE_BEERS', payload: result.moved })
    // } else alert('You can not move beer from favourite list into beers list!')
  }

  return (
    <div className='BookContainer-Container'>
      <div className='BookContainer-Row'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'booksList'}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              >
                <div className='BookContainer-Column'>
                  {map(books, (book, idx) => {
                    return (
                      <BookCard style={{ flexGrow: 1 }} key={`${book.id}-${idx}`} book={book} />
                    )
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>



          <div className='BookContainer-Column'>

          </div>
        </DragDropContext>
      </div>
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
  )
}