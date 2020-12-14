import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from 'reactstrap';
import LanguageSelect from './LanguageSelect.jsx';
import '../styles/FindBookForm.css';

const FindBookForm = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm();

  return (
    <div className='BookForm-Container'>
      <h3 className='BookForm-Header'>
        {'Provide factors & find books!'}
      </h3>
      <form
        id='FindBookForm-Form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="bookTitle">Book Title</label>
          <input
            id='FindBookForm-Input-BookTitle'
            name="bookTitle"
            placeholder="Enter a book title..."
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id='FindBookForm-Input-Subject'
            name="subject"
            placeholder="Enter subject..."
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="authorName">Author Name</label>
          <input
            id='FindBookForm-Input-AuthorName'
            name="authorName"
            placeholder="Enter author name..."
            ref={register}
          />
        </div>
        <LanguageSelect control={control} />
        <div className='BookForm-Footer'>
          <Button
            id='FindBookForm-Submit-Button'
            color="success"
          >
            <i className="fas fa-search" />{' '}
            {'Search'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FindBookForm;