/* eslint-disable default-case */
import React, { useState } from 'react';
import { useData } from '../utils/useData.jsx';
import FindBookForm from './FindBookForm.jsx';
import BookContiner from './BookContainer.jsx';
import NoData from './NoData.jsx';
import { isEqual } from 'lodash';
import '../styles/loader.css';

const DataManageComponent = () => {
  const [path, setPath] = useState('');
  const [params, setParams] = useState(null)
  const [pathIndex, setPathIndex] = useState(0);
  const { data, isLoading } = useData(path, pathIndex);

  const handlePath = (fetchParams) => {
    const { authorName, subject, bookTitle, language } = fetchParams;
    let newPath = []

    for (let param in fetchParams) {
      if (fetchParams[param]) {
        switch (param) {
          case ('bookTitle'):
            newPath.push(`intitle:"${bookTitle.replace(/\s/g, '+')}"`)
            break;
          case ('subject'):
            newPath.push(`subject:"${subject.replace(/\s/g, '+')}"`)
            break;
          case ('authorName'):
            newPath.push(`$inauthor:"${authorName.replace(/\s/g, '+')}"`)
            break;
          case ('language'):
            newPath.push(`${language.value}&langRestrict=${language.value}`)
            break;
        }
      }
    }
    if (!isEqual(fetchParams, params)) {
      setPathIndex(0)
    }
    setParams(fetchParams);
    setPath(newPath.join('+'))
  };

  const handelPathIndex = (e) => {
    const { name } = e.target;
    if (name === 'more') {
      setPathIndex(index => index + 10)
    } else if (name === 'back') {
      setPathIndex(index => index - 10)
    }
  }

  if (!data && !isLoading) {
    return (
      <FindBookForm
        onSubmit={handlePath}
      />)
  } else
    return (
      <div>
        {isLoading ?
          <div className='loader' /> :
          data.items ?
            <BookContiner
              books={data.items}
              onSubmit={handlePath}
              pathIndex={pathIndex}
              handelPathIndex={handelPathIndex} />
            :
            <NoData onSubmit={handlePath} />
        }
      </div>
    )
}

export default DataManageComponent;