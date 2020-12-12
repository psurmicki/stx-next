import React from 'react';
import '../styles/BookCard.css';


export default function BookCard({ book }) {
  return (
    <div className='BookCard-Container'>
      <div className='BookCard-Body'>
        <div className='BookCardImage-Container'>
          <img
            src={book.volumeInfo.imageLinks ?
              `${book.volumeInfo.imageLinks.smallThumbnail}`
              : ''} alt={book.volumeInfo.title} />
        </div>
        <div>
          <h4>{book.volumeInfo.title}</h4>
          <h3>{book.volumeInfo.categories}</h3>
          <p>
            {book.volumeInfo.description}
          </p>
        </div>
      </div>
    </div>

  );
};




// export default function BookCard({ book }) {
//   return (
//     <Card /* className='BookCard' */>
//       <CardImg top src={book.volumeInfo.imageLinks ? `${book.volumeInfo.imageLinks.smallThumbnail}` : ''} />
//       <CardBody>
//         <CardTitle tag="h5">{book.volumeInfo.title}</CardTitle>
//         <CardSubtitle tag="h6" className="mb-2 text-muted">
//           {book.volumeInfo.categories}
//         </CardSubtitle>
//         <CardText>
//           {book.volumeInfo.description}
//         </CardText>
//       </CardBody>
//     </Card>
//   );
// };
