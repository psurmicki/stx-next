import React from 'react';
import noData from '../images/noData.png';
import { Button } from 'reactstrap';
// import { refreshPage } from '../utils/functions.jsx'
import '../styles/NoData.css';

export default function NoData() {
  return (
    <div>
      <img
        className="noDataViewerCard"
        src={noData}
        alt="no data in DB"
      />
      <h2 className='noDataText'>
        Please, choose another factors
      </h2>
      <Button
        outline
        color="danger"
        size="xl"
        className='button'
      // onClick={refreshPage}
      >
        Refresh Page
      </Button>
    </div>
  )
}