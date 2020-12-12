import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from 'reactstrap';
import DatePicker from './DatePicker.jsx';
import LanguageSelect from './LanguageSelect.jsx';
import '../styles/FindBookForm.css';

export default function FindBookForm({ onSubmit }) {

  const { register, handleSubmit, control } = useForm();

  return (
    <div className='BookForm-Container'>
      <h3 className='BookForm-Header'>
        {'Provide values & find books!'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="bookTitle">Book Title</label>
          <input
            name="bookTitle"
            placeholder="Enter a book title"
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            name="subject"
            placeholder="Enter subject"
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="authorName">Author Name</label>
          <input
            name="authorName"
            placeholder="Enter author name"
            ref={register}
          />
        </div>
        <LanguageSelect control={control} />
        <DatePicker control={control} />
        <div className='BookForm-Footer'>
          <Button
            color="success"
          >
            {'Search'}
          </Button>
        </div>
      </form>
    </div>
  );
}