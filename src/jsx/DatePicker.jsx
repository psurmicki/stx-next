import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePicker.css';

export default function DatePicker({ control }) {
  const [publishedDate, setPublishedDate] = useState(null)

  const handleSelectDate = (selectedDate) => {
    setPublishedDate(selectedDate)
    return selectedDate;
  }

  return (
    <div className='DatePickerContainer'>
      <label htmlFor="publishedDate">Pick published date</label>
      <Controller
        control={control}
        name="publishedDate"
        as={ReactDatePicker}
        id="publishedDate"
        valueName="selectedDate"
        onChange={([selectedDate]) => handleSelectDate(selectedDate)}
        dateFormat="yyyy-MM"
        isClearable
        placeholderText={'Pick published date'}
        selected={publishedDate}
        showMonthYearPicker
      />
    </div>
  )
}