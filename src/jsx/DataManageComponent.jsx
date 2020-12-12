/* eslint-disable default-case */
import React, { useState/* , useEffect */ } from 'react';
import { useData } from '../utils/useData.jsx';
import FindBookForm from './FindBookForm.jsx';
import BookContiner from './BookContainer.jsx';
// import BookFormModal from './BookFormModal.jsx';
// import NoData from './NoData.jsx';
import '../styles/loader.css';

export default function DataManageComponent() {
  const [path, setPath] = useState('');
  const [pathIndex, setPathIndex] = useState(0);
  // const [modalIsOpen, setModalOpen] = useState(false)
  const { data, isLoading } = useData(path, pathIndex);
  const [isActive, setIsActive] = useState(false);

  const handlePath = (fetchParams) => {
    const { authorName, subject, bookTitle, language/*, publishedDate*/ } = fetchParams;
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
    setPath(newPath.join('+'))
    setIsActive((prevValue) => !prevValue);
  };

  const handelPathIndex = (e) => {
    console.log({ path }, { pathIndex }, e.target.name)
    const { name } = e.target;
    if (name === 'more') {
      setPathIndex(index => index + 10)
    } else {
      setPathIndex(index => index - 10)
    }

  }

  if (!isActive) {
    return <FindBookForm onSubmit={handlePath} />
  } else
    return (
      <div>
        {isLoading ?
          <div className='loader' /> :
          data &&
          <BookContiner
            books={data.items}
            onSubmit={handlePath}
            pathIndex={pathIndex}
            handelPathIndex={handelPathIndex} />
        }
      </div>
    )
}

          // :
          // <FindBookForm onSubmit={handlePath} />
          // :
          // <NoData />


// <Button
//         type='submit'
//         onClick={() => setModalOpen(!modalIsOpen)}
//       />
//       {
//         modalIsOpen &&
//         <BookFormModal
//           modalIsOpen={modalIsOpen}
//           setModalOpen={setModalOpen}
//           onSubmit={onSubmit}
//         />
//       }