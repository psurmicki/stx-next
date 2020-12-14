import React, { useState } from 'react';
import { Button, Row } from 'reactstrap';
import noData from '../images/noData.png';
import BookFormModal from './BookFormModal.jsx';
import '../styles/NoData.css';

const NoData = ({ onSubmit }) => {
  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Row>
        <img
          className="NoData-Image"
          src={noData}
          alt="no data in DB"
        />
      </Row>
      <Row noGutters className='NoData-Row'>
        <h2 className='NoData-Text'>
          {'Please, choose another factors...'}
        </h2>
        <Button
          id='NoData-Button-NewSearch'
          size="xl"
          name='more'
          color="danger"
          onClick={() => setModalOpen((prevValue) => !prevValue)}
        >
          <i className="fas fa-search" />{' '}
          {' New Search'}
        </Button>

      </Row>
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

export default NoData;